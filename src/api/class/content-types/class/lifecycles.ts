/*module.exports = {
  async beforeUpdate(event) {
    const { params } = event;

    if (params.data.teachers) {
      const currentClass = await strapi.db.query("api::class.class").findOne({
        where: { id: params.where.id },
        populate: { teachers: true },
      });
      if (!currentClass) {
        throw new Error(`Class with id ${params.id} not found`);
      }

      const currentTeacherCount = currentClass.teachers.length;
      console.log(`currentTeacherCount: ${currentTeacherCount}`);

      const newTeacherCount = currentTeacherCount + 1;
      console.log(`newTeacherCount: ${newTeacherCount}`);
      await strapi.db.query("api::teacher.teacher").update({
        where: { id: params.where.id },
        data: {
          TotalClasses: newTeacherCount,
        },
      });
    }
  },
};*/
module.exports = {
  afterUpdate: async (event) => {
    const { params } = event;

    console.log("params->", params);

    // Verificar si existe `params.data.teachers.connect` y si es un array
    if (params.data.teachers && Array.isArray(params.data.teachers.connect)) {
      console.log("params.data.teachers->", params.data.teachers);

      // Obtener los IDs de los profesores conectados
      const idTeacherAddCount = params.data.teachers.connect.map(
        (item) => item.id
      );
      console.log("idTeacherAddCount->", idTeacherAddCount);

      // Asegurarse de que idTeacherAddCount no esté vacío
      if (idTeacherAddCount.length === 0) {
        throw new Error("No teachers are being connected.");
      }

      // Aquí estamos obteniendo el último profesor del array, ya que asumo que es el que se está agregando a la clase
      const lastTeacherId = idTeacherAddCount[idTeacherAddCount.length - 1];

      // Obtener el último profesor que se está asignando
      const currentTeacher = await strapi.db
        .query("api::teacher.teacher")
        .findOne({
          where: { id: lastTeacherId },
          populate: { classes: true },
        });

      if (!currentTeacher) {
        throw new Error(`Teacher with id ${lastTeacherId} not found`);
      }

      console.log("currentTeacher->", currentTeacher);

      // El contador de clases se basa en el número de clases que tiene este profesor
      const currentTeacherCount = currentTeacher.classes.length + 1;
      console.log("currentTeacherCount-> ", currentTeacherCount);

      // Actualizar el TotalClasses del profesor con el nuevo valor
      await strapi.db.query("api::teacher.teacher").update({
        where: { id: lastTeacherId },
        data: {
          TotalClasses: currentTeacherCount, // Aquí se actualiza el contador con la cantidad de clases
        },
      });
    } else {
      console.log("No teachers are connected or the connect array is empty.");
    }
  },
};
