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
    path: "/profil/oglasi",
    name: "moji oglasi",
    meta: {
      title: "Moji oglasi",
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
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title; // Set the document title from route meta
  } else {
    document.title = "PetConnect"; // Fallback title if none is set in the route meta
  }
  next(); // Proceed to the next navigation
});

export default router;
