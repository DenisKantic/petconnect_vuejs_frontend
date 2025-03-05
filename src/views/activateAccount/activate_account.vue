<template>
  <MainNavbar />
  <ActivateAccount />
</template>

<script>
import ActivateAccount from "@/components/activateAccount/activate_account.vue";
import MainNavbar from "@/components/navbar/main_navbar.vue";

export default {
  components: {
    ActivateAccount,
    MainNavbar,
  },
};
</script>
