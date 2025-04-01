import { factories } from "@strapi/strapi";

const CLASS_SERVICE = "api::class.class";

export default factories.createCoreController(CLASS_SERVICE, () => ({
  async classJoinTeacher(ctx) {
    try {
      const { Name, id } = ctx.params; // 'Name' es el nombre del profesor, 'id' es el id de la clase.

      // Buscar la clase por su ID
      const classRecord = await strapi.db.query(CLASS_SERVICE).findOne({
        where: { id: id },
      });
      if (!classRecord) {
        return ctx.notFound(`Id  ${id} of class not found`);
      }

      // Buscar al profesor por su nombre
      const teacher = await strapi.db.query("api::teacher.teacher").findOne({
        where: { Name: Name },
      });
      if (!teacher) {
        return ctx.notFound(`Teacher ${Name} does not exist`);
      }
      //Hacer consulta a la bbdd para sacar los profes, y luego añadir los que hay + el que queremos
      const teachers = await strapi.db.query("api::teacher.teacher").findMany({
        where: {
          class: {
            id: classRecord.id,
          },
        },
        populate: {
          class: true,
        },
      });

      // Comprobar si el nuevo profesor ya está en la lista
      const existingTeacherIds = teachers.map((t) => t.id);
      if (!existingTeacherIds.includes(teacher.id)) {
        // Si no está, añadirlo a la lista
        teachers.push({ id: teacher.id });
      } else {
        return ctx.badRequest(`The teacher ${Name} is already at this class.`);
      }

      // Paso 3: Actualizar la clase con la lista de profesores actualizada
      await strapi.db.query(CLASS_SERVICE).update({
        where: { id: classRecord.id },
        data: { teachers: teachers.map((t) => t.id) }, // Asignamos solo los ids de los profesores
      });

      /*
      El método map() recorre el arreglo updatedTeachers y crea un nuevo arreglo con los id de cada uno de los profesores.
       Es decir, para cada elemento t en el arreglo updatedTeachers, extraemos solo el valor de id.
      */

      return {
        ok: true,
        mensaje: `Teacher ${Name} joined correctly`,
        clase: classRecord.Name, // Mostrar clase
      };
    } catch (error) {
      return ctx.badRequest("Error joining teacher", { error: error.message });
    }
  },
}));
