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
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;