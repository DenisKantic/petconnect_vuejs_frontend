<template>
  <v-app-bar app color="white" dark class="px-16">
    <v-app-bar-nav-icon
      v-if="$vuetify.display.smAndDown"
      @click="drawer = !drawer"
    />

    <v-app-bar-title v-if="$vuetify.display.mdAndUp">
      <router-link to="/">
        <v-avatar color="surface-light" size="45">
          <img src="@/assets/logo.svg" alt="Logo" />
        </v-avatar>
      </router-link>
      <v-btn text class="ml-2" v-if="$vuetify.display.lgAndUp"
        >PetConnect</v-btn
      >
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn text class="ml-2">Početna</v-btn>
      <v-btn text class="ml-2">O nama</v-btn>
      <v-btn text class="ml-2">Politika privatnosti</v-btn>
      <v-btn text class="ml-2">Kontakt</v-btn>
    </template>

    <v-menu v-if="isUserLoggedIn.isAuthenticated">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-avatar
            color="surface-light"
            image="https://cdn.vuetifyjs.com/images/john.png"
            size="35"
          />
        </v-btn>
      </template>
      <v-list style="padding: 0">
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title><router-link :to="item.to" class="text-decoration-none">{{ item.title }}</router-link></v-list-item-title>
        </v-list-item>
        <v-btn
          style="width: 100%; border-radius: 0"
          color="red"
          @click="logout"
        >
          ODJAVI SE
        </v-btn>
      </v-list>
    </v-menu>

    <router-link to="/prijava" v-else>
      <v-btn variant="outlined" flat color="blue">Prijavi se</v-btn>
    </router-link>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      right
      :class="{ 'drawer-open': drawer, 'drawer-closed': !drawer }"
      class="px-16"
      v-if="$vuetify.display.smAndDown"
    >
      <v-list id="first-list">
        <v-list-item v-for="(item, index) in links" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <p class="text-center" id="categories">Kategorije oglasa</p>

      <v-list id="second-navbar">
        <v-list-item>
          <v-list-item-title
            ><router-link to="/udomi"
              >Udomi životinju</router-link
            ></v-list-item-title
          >
          <v-list-item-title
            ><router-link to="/izgubljeni"
              >Izgubljene životinje</router-link
            ></v-list-item-title
          >
          <v-list-item-title
            ><router-link to="/donacije"
              >Donacijski oglasi</router-link
            ></v-list-item-title
          >
          <!-- <v-list-item-title
            ><router-link to="/sos">SOS oglasi</router-link></v-list-item-title
          > -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export default {
  data() {
    const isUserLoggedIn = useAuthStore();
    return {
      isUserLoggedIn,
      isLoggedIn: false,
      drawer: false,
      snackbar: {
        visible: false,
        message: "",
        color: "success",
      },
      items: [
        { title: "Objavi oglas", to: "/kreirajoglas"},
        { title: "Moj profil", to: "/profil"},
        { title: "Postavke", to: "/profil/postavke"},
      ],
      links: [
        { title: "Početna" },
        { title: "O nama" },
        { title: "Politika privatnosti" },
        { title: "Kontakt" },
      ],
    };
  },
  computed: {},
  methods: {
    // async checkAuth() {
    //   this.isLoggedIn = false;
    //   console.log("IS LOGGED IN STATE", this.isLoggedIn);

    //   try {
    //     const response = await axios.get(
    //       `http://localhost:8080/validate-token?refresh=${new Date().getTime()}`,
    //       {
    //         withCredentials: true, // Ensure cookies are sent
    //       },
    //     );
    //     console.log("RES", response);
    //     if (response.status == 200) {
    //       this.isLoggedIn = true;
    //     }
    //   } catch (error) {
    //     console.error("Authentication error:", error);
    //     this.isLoggedIn = false;
    //     Cookies.remove("auth_token", { path: "/" });
    //   }
    // },
    showSnackbar(message, color) {
      this.snackbar.visible = true;
      this.snackbar.message = message;
      this.snackbar.color = color;
    },
    logout() {
      Cookies.remove("auth_token", { path: "/" });
      this.showSnackbar("Odjavljivanje uspješno", "success");
      this.isLoggedIn = false;
      this.$router.push("/");

      window.location.reload();
      axios.post(
        `http://localhost:8080/logout?refresh=${new Date().getTime()}`,
        {},
        { withCredentials: true },
      );
      Cookies.remove("auth_token").catch((error) => {
        console.error("Logout error");
        this.showSnackbar("Greška prilikom odjavljivanja", "error");
      });
    },
  },
  mounted() {
    console.log("NAVBAR AUTH TEST", this.isUserLoggedIn.isAuthenticated)
    // this.checkAuth(); // Check authentication status when the component mounts
  },
};
</script>

<style scoped>
.drawer-closed {
  transition: transform 0.3 ease-in-out;
  display: none;
}

.v-navigation-drawer {
  min-height: 50vh;
  width: 100% !important;
  background-color: #ffffff;
}

#first-list .v-list-item-title {
  font-size: 1.2rem !important;
}

#second-navbar .v-list-item .v-list-item-title {
  font-size: 1.3rem;
  font-weight: bolder;
  padding-top: 1rem;
}

#second-navbar .v-list-item .v-list-item-title a {
  text-decoration: none;
  color: #1d3a5f !important;
}

#categories {
  background-color: #1d3a5f;
  color: white;
  font-size: 1.5rem;
  padding: 0.4rem;
  margin: auto;
}
</style>
