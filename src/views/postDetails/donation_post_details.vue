<template>
  <MainNavbar />
  <SecondNavbar />
  <DonationPostDetails />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import DonationPostDetails from "@/components/postDetails/donation_post_details.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    DonationPostDetails,
  },
};
</script>
