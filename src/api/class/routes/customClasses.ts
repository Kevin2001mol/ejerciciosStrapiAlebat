export default {
    routes: [
       {
        method: 'PUT',
        path: '/class/:id/:Name',
        handler: 'class.classJoinTeacher',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ],
};
  