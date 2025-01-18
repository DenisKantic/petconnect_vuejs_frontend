<template>
  <v-app-bar app color="white" dark class="px-16">
    <!-- Drawer toggle icon for small devices -->
    <v-app-bar-nav-icon
      v-if="$vuetify.display.smAndDown"
      @click="drawer = !drawer"
    />

    <!-- Logo and Title -->
    <v-app-bar-title v-if="$vuetify.display.mdAndUp">
      <router-link to="/">
        <v-avatar color="surface-light" size="45">
          <img src="@/assets/logo.svg" alt="Logo" />
        </v-avatar>
      </router-link>
      <v-btn text class="ml-2"
      v-if="$vuetify.display.lgAndUp">PetConnect</v-btn>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Links for larger devices -->
    <template v-if="$vuetify.display.mdAndUp">
      <v-btn text class="ml-2">Početna</v-btn>
      <v-btn text class="ml-2">O nama</v-btn>
      <v-btn text class="ml-2">Politika privatnosti</v-btn>
      <v-btn text class="ml-2">Kontakt</v-btn>
    </template>

    <!-- User menu (shared across all screen sizes) -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-avatar
            color="surface-light"
            image="https://cdn.vuetifyjs.com/images/john.png"
            size="35"
          />
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    
    <!-- Drawer for smaller devices -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      right
      :class="{'drawer-open':drawer, 'drawer-closed': !drawer}"
      class="px-16"
      v-if="$vuetify.display.smAndDown"
    >
    <v-list id="first-list">
        <v-list-item
          v-for="(item, index) in links"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <p class="text-center" id="categories">Kategorije oglasa</p>

      <v-list id="second-navbar">
        <v-list-item
          v-for="(item, index) in categories"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);

const items = [
  { title: "Objavi oglas" },
  { title: "Moj profil" },
  { title: "Postavke" },
  { title: "Odjavi se" },
];

const categories = [
  {title: "Udomi životinju"},
  {title: "Izgubljene životinje"},
  {title: "Donacijski oglasi"},
  {title: "SOS oglasi"}
]

const links = [
  {title: "Početna"}, 
  {title: "O nama"}, 
  {title: "Politika privatnosti"}, 
  {title: "Kontakt"}
  ];
</script>

<style scoped>
.drawer-closed{
  transition: transform 0.3 ease-in-out;
  display: none;
}

.v-navigation-drawer{
  min-height: 50vh;
  width: 100% !important;
  background-color: #FFFFFF;
}

#first-list .v-list-item-title{
  font-size: 1.2rem !important;
}

#second-navbar .v-list-item-title{
  color: #1D3A5F !important;
  font-size: 1.2rem !important;
  font-weight: bolder;
}



#categories{
  background-color: #1D3A5F;
  color: white;
  font-size: 1.5rem;
  padding: 0.4rem;
  margin: auto;
}
</style>
