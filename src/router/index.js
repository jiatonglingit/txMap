/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/txMap.vue";
import Layout from '../views/Layouts'
import layoutSpace from '../views/space/layoutSpace'
import login from "../views/login"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "首页",
        component: Layout,
        redirect: "/login",
        meta: {
            keepAlive: true
        },
        children: [
            {
                path: "/index",
                name: "home1",
                component: Home
            },
             


        ]
    },
    {
        path: "/spaceCode",
        name: "智能评估",
        component: layoutSpace,
        redirect: '/spaceCode',
        children: [{
            path: "/spaceCode",
            name: "spaceCode",
            component: () =>
                import ( /* webpackChunkName: "create" */ '../views/space/space')
        }, ]

    },
    {
        path: "/login",
        name: "login",
        component: login
    },
];

const router = new VueRouter({
    routes
});

export default router;