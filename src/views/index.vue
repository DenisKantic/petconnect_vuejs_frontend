<template>
  <div>
    <Navbar />
    <SecondNavbar />
    <v-main>
      <h1>Test</h1>
    </v-main>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
export default {
  components: {
    Navbar,
    SecondNavbar,
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
</style>
