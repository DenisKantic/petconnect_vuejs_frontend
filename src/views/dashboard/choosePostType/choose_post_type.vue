<template>
  <MainNavbar />
  <ChoosePostType />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import ChoosePostType from "@/components/dashboard/choose_post_type.vue";

export default {
  components: {
    MainNavbar,
    ChoosePostType,
  },
};
</script>
