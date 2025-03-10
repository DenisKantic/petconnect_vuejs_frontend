<template>
  <NotFound />
  <Navbar />
  <SecondNavbar />
</template>

<script>
import NotFound from "@/components/not_found.vue";
import Navbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";

export default {
  components: {
    NotFound,
    Navbar,
    SecondNavbar
  },
};
</script>
