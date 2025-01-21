import {
  createRouter,
  //createWebHashHistory,
  createWebHistory,
} from "vue-router";
import auth from "../middleware/auth"

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
  {
    path: "/udomi",
    name: "udomi",
    meta: {
      title: "Udomi ljubimca",
    },
    component: () => import("@/views/pages/adopt_page.vue"),
  },
  {
    path: "/sos",
    name: "sos oglasi",
    meta: {
      title: "SOS oglasi",
    },
    component: () => import("@/views/pages/sos_page.vue"),
  },
  {
    path: "/izgubljeni",
    name: "izgubljeni ljubimci",
    meta: {
      title: "Izgubljeni ljubimci",
    },
    component: () => import("@/views/pages/lost_page.vue"),
  },
  {
    path: "/donacije",
    name: "donacijski oglasi",
    meta: {
      title: "Donacijski oglasi",
    },
    component: () => import("@/views/pages/donation_page.vue"),
  },
  {
    path: "/profil",
    name: "moji oglasi",
    meta: {
      title: "Moji oglasi",
      requiresAuth: true
    },
    component: () => import("@/views/dashboard/home_page.vue"),
  },
  {
    path: "/profil/postavke",
    name: "Postavke profila",
    meta: {
      title: "Postavke profila",
    },
    component: () => import("@/views/settings/settings.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not_found.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to update the document title
router.beforeEach(async(to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title; // Set the document title from route meta
  } else {
    document.title = "PetConnect"; // Fallback title if none is set in the route meta
  }  
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await auth();
      next(); // User is authenticated, proceed to route
    } catch (error) {
      // User is not authenticated, redirect to login
      next({ name: 'login' });
    }
  } else {
    next(); // Route doesn't require auth, proceed as normal
  }
});

export default router;
