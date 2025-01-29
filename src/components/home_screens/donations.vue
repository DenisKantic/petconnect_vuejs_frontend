<template>
  <div class="d-flex flex-row items-center justify-between pt-10">
    <h1>Donacijski oglasi</h1>
    <router-link to="donacije"
      ><v-btn variant="outlined" color="primary"
        >Prikaži sve</v-btn
      ></router-link
    >
  </div>
  <v-row class="pt-5">
    <v-col v-for="post in post" :key="post.id" cols="12" sm="6" md="4" xl="2">
      <v-card>

        <v-img 
        :src="post.images.length > 5 ? 
        `http://localhost:8080/${post.images[0]}` 
        : 'https://placehold.co/300x200'" 
        >
      </v-img>
        <!-- Card content -->
        <v-card-title>
          <div class="text-h6">{{ post.name }}</div>
        </v-card-title>
        <v-card-subtitle>
          <div>{{ post.location }}</div>
          <div>{{ post.category }}</div>
          <div>{{ post.sex }}</div>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      post: [],
      name: "Pet Name",
      location: "Location",
      category: "Category",
      sex: "Male",
    };
  },
  mounted(){
    this.FetchPost()
  },  
  methods:{
    async FetchPost(){
      try{
        const response = await this.$http.get("http://localhost:8080/latest-donation-post");
        this.post = response.data;
        console.log(response.data)
      } catch(error){
        console.log("error")
      }
    }
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
