<template>
  <Login />
  <CustomFooter />
</template>

<script>
import Login from "@/components/auth/login.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";


export default {
  components: {
    Login,
    CustomFooter
  },
};
</script>
