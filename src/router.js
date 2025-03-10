import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import { useAuthStore } from "./stores/authStore";

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
    path: "/udomi/:id",
    name: "Detaljan pregled",
    meta: {
      title: "Detaljni pregled",
    },
    component: () => import("@/views/postDetails/post_details.vue"),
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
    path: "/izgubljeni/:id",
    name: "Izgubljeni ljubimac",
    meta: {
      title: "Izgubljeni ljubimac",
    },
    component: () => import("@/views/postDetails/lost_post_details.vue"),
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
    path: "/donacije/:id",
    name: "Donacije pregled",
    meta: {
      title: "Donacijski oglas",
    },
    component: () => import("@/views/postDetails/donation_post_details.vue"),
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
    path: "/profil/kreirajoglas",
    name: "Izaberi oglas",
    meta: {
      title: "Izaberi oglas",
      requiresAuth: true,
    },
    component: () =>
      import("@/views/dashboard/choosePostType/choose_post_type.vue"),
  },
  {
    path: "/profil/kreirajoglas/udomi",
    name: "Kreiraj oglas",
    meta: {
      title: "Udomi ljubimca",
      requiresAuth: true,
    },
    component: () =>
      import("@/views/dashboard/createAdoptPost/create_adopt_post.vue"),
  },
  {
    path: "/profil/kreirajoglas/izgubljeni",
    name: "Izgubljeni oglas",
    meta: {
      title: "Izgubljeni ljubimci",
      requiresAuth: true,
    },
    component: () =>
      import("@/views/dashboard/createLostPost/create_lost_post.vue"),
  },
  {
    path: "/profil/kreirajoglas/donacije",
    name: "Donacijski oglas",
    meta: {
      title: "Izgubljeni ljubimac",
      requiresAuth: true,
    },
    component: () =>
      import("@/views/dashboard/createDonationPost/create_donation_post.vue"),
  },
  {
    path: "/profil/postavke",
    name: "Postavke profila",
    meta: {
      title: "Postavke profila",
      requiresAuth: true,
    },
    component: () => import("@/views/settings/settings.vue"),
  },
  {
    path: "/aktiviraj-profil",
    name: "Aktivacija profila",
    meta: {
      title: "Aktivacija profila",
    },
    component: () => import("@/views/activateAccount/activate_account.vue"),
  },
  {
    path: "/pravila",
    name: "Pravila",
    meta: {
      title: "Pravila i privatnost"
    },
    component: () => import("@/views/policyRules/policy.vue")
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
  document.title = to.meta.title || "PetConnect"; // Set page title

  const authStore = useAuthStore(); // accessing store for storing global state if user is logged in
  try {
    // Always check authentication status (even for public routes)
    const response = await axios.get(`http://localhost:8080/validate-token`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      authStore.isAuthenticated = true;
    } else {
      authStore.isAuthenticated = false;
    }
  } catch (err) {
    authStore.isAuthenticated = false;
  }

  // If the route requires authentication and user is not authenticated, redirect
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !authStore.isAuthenticated
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
