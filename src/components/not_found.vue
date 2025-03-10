<!-- src/components/NotFound.vue -->
<template>
  <v-container class="d-flex align-center justify-center" height="100%">
    <v-row justify="center" align="center">
      <v-col class="text-center" cols="10" sm="6" md="3">
        <p class="font-weight-bold pb-10 text-h4">
          Opssss...došlo je do greške!
        </p>
        <v-img src="@/assets/not_found.svg" alt="404 Error" />
        <h1 class="text-h4 py-6">Stranica nije pronađena</h1>
        <v-btn color="primary" @click="$router.push('/')"
          >Povratak na početnu</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
h1 {
  color: #2f5382;
}
</style>
