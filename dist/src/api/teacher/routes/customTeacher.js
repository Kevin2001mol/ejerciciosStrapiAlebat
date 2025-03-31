"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/teachers',
            handler: 'teacher.createTeacher',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/teachers/:id',
            handler: 'teacher.teachersEvents',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
