<template>
  <v-app-bar app color="white" dark class="px-16">
    <v-app-bar-nav-icon
      v-if="$vuetify.display.smAndDown"
      @click="drawer = !drawer"
    />

    <v-app-bar-title>
      <v-avatar color="surface-light" size="45">
        <router-link to="/">
          <img src="@/assets/logo.svg" alt="Logo" />
        </router-link>
      </v-avatar>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn text class="ml-2">Početna</v-btn>
    <v-btn text class="ml-2">O nama</v-btn>
    <v-btn text class="ml-2">Politika privatnosti</v-btn>
    <v-btn text class="ml-2">Kontakt</v-btn>

    <!-- Menu positioned right below the Avatar -->
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
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
const items = [
  { title: "Objavi oglas" },
  { title: "Moj profil" },
  { title: "Postavke" },
  { title: "Odjavi se" },
];
</script>

<style scoped></style>
