<template>
  <MainNavbar />
  <CreateLostPost />
</template>

<script>
import CreateLostPost from "@/components/dashboard/createLostPost/create_lost_post.vue";
import MainNavbar from "@/components/navbar/main_navbar.vue";

export default {
  components: {
    CreateLostPost,
    MainNavbar,
  },
};
</script>
