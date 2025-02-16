<template>
  <MainNavbar />
  <CreateDonationPost />
</template>

<script>
import CreateDonationPost from "@/components/dashboard/createDonationPost/create_donation_post.vue";
import MainNavbar from "@/components/navbar/main_navbar.vue";

export default {
  components: {
    CreateDonationPost,
    MainNavbar,
  },
};
</script>
