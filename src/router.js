import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: "home",
        component: ()=> import ("@/views/index.vue"),
        meta: {title: "Home"}
    },
    {
        path: '/login',
        name: "login",
        component: () => import ("@/views/auth/login.vue"),
        meta: {title: 'Login'}
    },
    {
        path: '/register',
        name: "register",
        component: () => import("@/views/auth/register.vue"),
        meta: {title: 'Register'}
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next)=>{
    if(to.meta && to.meta.title){
        document.title = to.meta.title
    } else {
        document.title = 'PetConnect'
    }
    next()
})

export default router;