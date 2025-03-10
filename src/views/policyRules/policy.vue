<template>
  <MainNavbar />
  <SecondNavbar />
  <Policy />
</template>

<script>
import Policy from "@/components/policyRules/policy.vue";
import MainNavbar from "@/components/navbar/main_navbar.vue";
import SecondNavbar from "@/components/navbar/second_navbar.vue";

export default {
  components: {
    Policy,
    MainNavbar,
    SecondNavbar,
  },
};
</script>
