<template>
        <h1 class="pt-10">Donacijski oglasi</h1>
        <span class="text-body-1 text-blue">Dostupan broj oglasa: 0</span>

        <v-row class="pt-5">
    <!-- Loop to create 4 cards -->
    <v-col v-for="i in 3" :key="i" cols="12" sm="4" md="4" xl="4">
      <v-card>
        <v-img src="https://via.placeholder.com/300x200" height="60%"></v-img>

        <!-- Card content -->
        <v-card-title>
          <div class="text-h6">{{ name }}</div>
        </v-card-title>
        <v-card-subtitle class="pb-2">
          <div>{{ location }}</div>
          <div>{{ category }}</div>
          <div>{{ sex }}</div>
        </v-card-subtitle>
        <v-divider></v-divider>
        <div class="d-flex justify-center items-center pt-5">
            <v-btn color="primary">Edit</v-btn>
            <v-btn color="warning">Delete</v-btn>
        </div>
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
