<template>
  <MainNavbar />
  <SecondNavbar />
  <Settings class="mb-10" />
  <CustomFooter />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import Settings from "@/components/settings/settings.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";


export default {
  components: {
    MainNavbar,
    SecondNavbar,
    Settings,
    CustomFooter
  },
};
</script>
