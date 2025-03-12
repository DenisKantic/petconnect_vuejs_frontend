<template>
  <div class="px-8 mb-10 px-sm-10 px-md-16 pt-5">
    <Donation />
  </div>
  <CustomFooter />
</template>

<script>
import Donation from "@/components/pages/donation_page.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";

export default {
  components: {
    Donation,
    CustomFooter,
  },
};
</script>
