<!-- src/components/NotFound.vue -->
<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh">
    <v-row justify="center" align="center">
      <v-col class="text-center" cols="6" md="4">
        <v-img src="@/assets/logo.svg" alt="404 Error" />
        <h1>Error 404 - Stranica nije pronađena</h1>
        <v-btn color="primary" @click="$router.push('/')">Go to Home</v-btn>
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
  font-size: 3rem;
  margin-bottom: 20px;
}
</style>
