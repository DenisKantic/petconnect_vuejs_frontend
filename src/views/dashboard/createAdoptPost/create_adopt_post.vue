<template>
  <MainNavbar />
  <CreateAdoptPost />
</template>

<script>
import CreateAdoptPost from "@/components/dashboard/createAdoptPost/create_adopt_post.vue";
import MainNavbar from "@/components/navbar/main_navbar.vue";

export default {
  components: {
    CreateAdoptPost,
    MainNavbar,
  },
};
</script>
