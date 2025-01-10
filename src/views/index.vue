<template>
  <div>
    <Navbar />
    <SecondNavbar />
    <v-main class="px-16 pt-10" style="background-color: #fafafa">
      <AdoptAnimals />
      <LostAnimals />
      <Donations />
      <SOS />
    </v-main>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import AdoptAnimals from "@/components/home_screens/adopt_animals.vue";
import LostAnimals from "@/components/home_screens/lost_animals.vue";
import Donations from "@/components/home_screens/donations.vue";
import SOS from "@/components/home_screens/sos.vue";

export default {
  components: {
    Navbar,
    SecondNavbar,
    AdoptAnimals,
    LostAnimals,
    Donations,
    SOS,
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
v-app-bar {
  height: auto !important;
}

.v-btn {
  border-radius: 0.6rem !important;
}
</style>
