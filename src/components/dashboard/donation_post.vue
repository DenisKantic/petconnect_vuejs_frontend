<template>
  <v-container class="px-0 px-lg-16">
  <h1 class="pt-10">Donacijski oglasi</h1>
  <span class="text-body-1 text-blue">Dostupan broj oglasa: {{ adoptPost?.length === 0 ? 0 : 3 - adoptPost.length }}</span>
  <v-row class="pt-5">
    <!-- Loop to create 3 cards -->
    <v-col v-for="post in adoptPost" :key="post.id" cols="12" sm="7" md="4" xl="4">
      <v-card>
        <v-img :src="`http://localhost:8080/${post.images[0]}`" aspect-ratio="2"></v-img>

        <!-- Card content -->
        <v-card-title>
          <div class="text-h6">{{ post.pet_name }}</div>
        </v-card-title>
        <v-card-subtitle class="pb-2 text-body-1">
          <div><v-icon color="primary" class="mr-1">mdi-map-marker</v-icon>{{ post.location }}</div>
          <div><v-icon color="primary" class="mr-1">mdi-paw</v-icon>{{ post.category }}</div>
          <div><v-icon color="primary" class="mr-1">mdi-gender-male-female</v-icon>{{ post.sex }}</div>
        </v-card-subtitle>
        <v-divider></v-divider>
        <div class="d-flex flex-column flex-lg-row mt-5" style="gap: 0.6rem;">
          <v-btn color="primary" class="flex-grow-1" variant="outlined">Podijeli <v-icon class="ml-1">mdi-facebook</v-icon></v-btn>
          <v-btn color="primary" class="flex-grow-1">Uredi</v-btn>
          <v-btn color="red" class="flex-grow-1">Obriši</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: "Pet Name",
      location: "Location",
      category: "Category",
      sex: "Male",
      adoptPost: []
    };
  },
  methods:{
      async getAdoptPost(){
        await axios.get('http://localhost:8080/my-adopt-post', {withCredentials: true})
        .then((response)=>{
          // console.log("RESPONSE", response.data)
          this.adoptPost = response.data
          console.log("NEW DATA", this.adoptPost)
        })
        .catch((error)=>{
          console.log("ERROR", error)
        })
      }
  },
  mounted(){
    this.getAdoptPost();
  }
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

.v-img {
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-radius: 1rem;
}
</style>
