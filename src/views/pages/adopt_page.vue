<template>
  <div class="px-8 mb-10 px-sm-10 px-md-16 pt-5">
    <AdoptPage />
  </div>
  <CustomFooter/>
</template>

<script>
import AdoptPage from "@/components/pages/adopt_page.vue";
import CustomFooter from "@/components/footer/custom_footer.vue";


export default {
  components: {
    AdoptPage,
    CustomFooter
  },
};
</script>
