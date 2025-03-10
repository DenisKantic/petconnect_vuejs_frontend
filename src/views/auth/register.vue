<template>
  <Register />
  <CustomFooter />
</template>

<script>
import Register from "@/components/auth/register.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";


export default {
  components: {
    Register,
    CustomFooter
  },
};
</script>
