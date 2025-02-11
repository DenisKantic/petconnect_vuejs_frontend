import {
  createRouter,
  createWebHistory,
} from "vue-router";
import axios from "axios";

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
  // {
  //   path: "/sos",
  //   name: "sos oglasi",
  //   meta: {
  //     title: "SOS oglasi",
  //   },
  //   component: () => import("@/views/pages/sos_page.vue"),
  // },
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
      requiresAuth: true,
    },
    component: () => import("@/views/dashboard/home_page.vue"),
  },
  {
    path: "/profil/kreirajoglas/udomi",
    name: "Kreiraj oglas",
    meta: {
      title: "Kreiraj oglas",
      requiresAuth: true,
    },
    component: () => import("@/views/dashboard/createAdoptPost/create_adopt_post.vue")
  },
  {
    path: "/profil/postavke",
    name: "Postavke profila",
    meta: {
      title: "Postavke profila",
      requiresAuth: true
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

// Global navigation guard to update the document title and check authentication
router.beforeEach(async (to, from, next) => {
  // Update the document title
  document.title = to.meta.title || "PetConnect"; // Fallback title

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const response = await axios.get("http://localhost:8080/validate-token", {
        withCredentials: true, // Ensure cookies are sent
      });
      console.log("RESPONSE", response.status)
      if (response.status) {
        next(); // User is authenticated, proceed to route
      } else {
        next({ name: "login" }); // User is not authenticated, redirect to login
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      next({ name: "login" }); // In case of error during auth, redirect to login
    }
  } else {
    next(); // Route doesn't require auth, proceed as normal
  }
});

export default router;