<template>
  <MainNavbar />
  <SecondNavbar />
  <HomePage class="mb-10" />
  <CustomFooter />
</template>

<script>
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import HomePage from "@/components/dashboard/home_page.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";

export default {
  components: {
    MainNavbar,
    SecondNavbar,
    HomePage,
    CustomFooter
  },
};
</script>
