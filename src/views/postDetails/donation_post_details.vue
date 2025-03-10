<template>
  <MainNavbar />
  <SecondNavbar />
  <DonationPostDetails />
  <CustomFooter />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import DonationPostDetails from "@/components/postDetails/donation_post_details.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";


export default {
  components: {
    MainNavbar,
    SecondNavbar,
    DonationPostDetails,
    CustomFooter
  },
};
</script>
