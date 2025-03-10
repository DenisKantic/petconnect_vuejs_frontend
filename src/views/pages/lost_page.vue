<template>
  <div class="px-8 mb-10 px-sm-10 px-md-16 pt-5">
    <Lost />
  </div>
  <CustomFooter />
</template>

<script>
import Lost from "@/components/pages/lost_page.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";


export default {
  components: {
    Lost,
    CustomFooter
  },
};
</script>
