/**
 * teacher controller
 */

import { factories } from '@strapi/strapi'
const SERVICE = 'api::teacher.teacher';
export default factories.createCoreController(SERVICE,() => ({
    async createTeacher(ctx){
        const { Name, Last_name, Email, Details} = ctx.request.body;

        //le metemos con document para que aparezca en strapi, abria que pponer todos los required pq si no peta
        const newTeacher = await strapi.documents(SERVICE).create({
            data: {
            Name,
            Last_name,
            Email,
            Details,
            },
            populate: {
                Details: true,
            },
            });
        
     
        return ctx.send(newTeacher);
    },
    
    async teachersEvents (ctx) {

        const { id } = ctx.params;

        const teacher = await strapi.documents(SERVICE).findOne({
          documentId: id ,
          populate: ['event'],
        });
        //console.log(ctx.response.message);
        const message = ctx.response.message;//esto te devuelve el mensaje, si 200, si 404, etc..
        return ctx.send(teacher);
        //return message;

    }
      
   
}));
