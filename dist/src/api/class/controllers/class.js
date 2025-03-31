"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const CLASS_SERVICE = 'api::class.class';
exports.default = strapi_1.factories.createCoreController(CLASS_SERVICE, () => ({
    async classJoinTeacher(ctx) {
        try {
            const { Name, id } = ctx.params; // 'Name' es el nombre del profesor, 'id' es el id de la clase.
            // Buscar la clase por su ID
            const classRecord = await strapi.db.query(CLASS_SERVICE).findOne({
                where: { id: id }, // Buscar la clase por ID
            });
            if (!classRecord) {
                return ctx.notFound(`Id  ${id} of class not found`);
            }
            // Buscar al profesor por su nombre (Name)
            const teacher = await strapi.db.query('api::teacher.teacher').findOne({
                where: { Name: Name }, // Buscar al profesor por su nombre
            });
            if (!teacher) {
                return ctx.notFound(`Teacher ${Name} does not exist`);
            }
            // Asignar el profesor a la clase
            await strapi.db.query(CLASS_SERVICE).update({
                where: { id: classRecord.id }, // Utilizar el id de la clase para actualizarla
                data: { teacher: teacher.id }, // Asignar al profesor encontrado a la clase
            });
            return {
                ok: true,
                mensaje: `Teacher ${Name} joined correctly`,
                clase: classRecord.Name, // Mostrar el nombre de la clase
                profesor: teacher.Name, // Mostrar el nombre del profesor
            };
        }
        catch (error) {
            return ctx.badRequest('Error joining teacher', { error: error.message });
        }
    },
}));
