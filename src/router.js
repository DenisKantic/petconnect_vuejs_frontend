import {
  createRouter,
  //createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/prijava",
    name: "login",
    meta: {
      title: "Prijava",
    },
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/registracija",
    name: "register",
    meta: {
      title: "Registracija",
    },
    component: () => import("@/views/auth/register.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to update the document title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title; // Set the document title from route meta
  } else {
    document.title = "PetConnect"; // Fallback title if none is set in the route meta
  }
  next(); // Proceed to the next navigation
});

export default router;
