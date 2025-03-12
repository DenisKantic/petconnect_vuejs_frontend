<template>
  <MainNavbar />
  <SecondNavbar />
  <PostDetails class="mb-10" />
  <CustomFooter />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import PostDetails from "@/components/postDetails/post_details.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    PostDetails,
    CustomFooter,
  },
};
</script>
