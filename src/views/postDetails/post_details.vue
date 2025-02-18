<template>
  <MainNavbar />
  <SecondNavbar />
  <PostDetails />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import PostDetails from "@/components/postDetails/post_details.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    PostDetails,
  },
};
</script>
