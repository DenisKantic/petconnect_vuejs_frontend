<template>
  <MainNavbar />
  <SecondNavbar />
  <LostPostDetails class="mb-10" />
  <CustomFooter />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import LostPostDetails from "@/components/postDetails/lost_post_details.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    LostPostDetails,
    CustomFooter,
  },
};
</script>
