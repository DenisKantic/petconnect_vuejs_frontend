<template>
  <MainNavbar />
  <SecondNavbar />
  <HomePage />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import HomePage from "@/components/dashboard/home_page.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    HomePage,
  },
};
</script>
