import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: "home",
        component: ()=> import ("@/views/index.vue")
    },
    {
        path: '/login',
        name: "login",
        component: () => import ("@/views/auth/login.vue")
    },
    {
        path: '/register',
        name: "register",
        component: () => import("@/views/auth/register.vue")
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;