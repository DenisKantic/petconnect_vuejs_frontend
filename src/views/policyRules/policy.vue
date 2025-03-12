<template>
  <MainNavbar />
  <SecondNavbar />
  <Policy class="mb-10" />
  <CustomFooter />
</template>

<script>
import Policy from "@/components/policyRules/policy.vue";
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";

export default {
  components: {
    Policy,
    MainNavbar,
    SecondNavbar,
    CustomFooter,
  },
};
</script>
