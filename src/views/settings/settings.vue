<template>
  <MainNavbar />
  <SecondNavbar />
  <Settings />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import Settings from "@/components/settings/settings.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    Settings,
  },
};
</script>
