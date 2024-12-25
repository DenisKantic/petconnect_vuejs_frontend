<template>
  <div class="d-flex flex-row items-center justify-between pt-10">
    <h1>Izgubljene životinje</h1>
    <v-btn variant="outlined" color="primary">Prikaži sve</v-btn>
  </div>
  <v-row class="pt-5">
    <!-- Loop to create 4 cards -->
    <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="4" xl="2">
      <v-card>
        <v-img src="https://via.placeholder.com/300x200" height="60%"></v-img>

        <!-- Card content -->
        <v-card-title>
          <div class="text-h6">{{ name }}</div>
        </v-card-title>
        <v-card-subtitle>
          <div>{{ location }}</div>
          <div>{{ category }}</div>
          <div>{{ sex }}</div>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "Pet Name",
      location: "Location",
      category: "Category",
      sex: "Male",
    };
  },
};
</script>

<style scoped>
.v-row {
  display: flex;
  flex-direction: row;
}
.v-card {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 0.8rem;
  border-radius: 0.8rem;
}

.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.v-img {
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-radius: 1rem;
}
</style>
