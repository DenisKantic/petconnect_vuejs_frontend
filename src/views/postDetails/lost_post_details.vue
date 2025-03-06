<template>
  <MainNavbar />
  <SecondNavbar />
  <LostPostDetails />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import LostPostDetails from "@/components/postDetails/lost_post_details.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    LostPostDetails,
  },
};
</script>
