<template>
  <v-container>
    <p class="text-center text-h5 py-5">Izaberi vrstu oglasa</p>
    <v-row>
      <v-col
        class="px-10 mx-auto pt-10"
        v-for="(card, index) in card_header"
        :key="index"
        cols="12"
        sm="4"
        md="4"
        lg="3"
      >
        <router-link class="text-decoration-none" :to="card.router">
          <v-card
            :color="card.color"
            class="d-flex flex-column items-center justify-center"
          >
            <v-card-title class="text-center">{{ card.title }}</v-card-title>
            <v-card-text class="mx-auto"
              ><v-icon size="50">{{ card.icon }}</v-icon></v-card-text
            >
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      card_header: [
        {
          title: "Udomi",
          icon: "mdi-paw",
          color: "primary",
          router: "/profil/kreirajoglas/udomi",
        },
        {
          title: "Donacija",
          icon: "mdi-hand-coin-outline",
          color: "secondary",
          router: "/profil/kreirajoglas/donacije",
        },
        {
          title: "Izgubljeni",
          icon: "mdi-alert-circle-outline",
          color: "warning",
          router: "/profil/kreirajoglas/izgubljeni",
        },
      ],
    };
  },
};
</script>
