<template>
  <Navbar />
  <SecondNavbar />

  <h1>Udomi ljubimca</h1>
  
 
  <div class="text-center">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Dropdown </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Test1</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

  <v-row>
    <v-col
      v-for="post in post"
      :key="post.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <v-skeleton-loader
        class="border"
        v-if="loading"
        max-width="300"
        type="image, article"
      ></v-skeleton-loader>
      <v-card v-else>
        <img
          :src="
            post.images.length > 0
              ? `http://localhost:8080/${post.images[0]}`
              : 'https://placehold.co/300x200'
          "
        />
        <!-- Card content -->
        <v-card-title>
          <div class="text-h6 font-weight-regular">
            {{ shorterPostName(post.pet_name) }}
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div>
            <v-icon class="mr-1" color="primary">mdi-map-marker</v-icon
            >{{ post.location }}
          </div>
          <div class="pt-1">
            <v-icon class="mr-1" color="info">{{
              post.category === "macka"
                ? "mdi-cat"
                : post.category === "pas"
                  ? "mdi-dog"
                  : "mdi-paw"
            }}</v-icon
            >{{
              post.category.charAt(0).toUpperCase() + post.category.slice(1)
            }}
          </div>
          <div class="pt-1">
            <v-icon
              class="mr-1"
              :color="post.sex === 'muzjak' ? 'primary' : 'red'"
              >{{
                post.sex === "muzjak" ? "mdi-gender-male" : "mdi-gender-female"
              }}</v-icon
            >{{ post.sex === "muzjak" ? "Mužjak" : "Ženka" }}
          </div>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
  <v-pagination
  class="pb-5"
      v-model="page"
      :length="20"
      :total-visible="4"
    ></v-pagination>
</template>

<script>
import Navbar from "../navbar/main_navbar.vue";
import SecondNavbar from "../navbar/second_navbar.vue";

export default {
  data(){
    return {
      post: [],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    
    }
  },
  components: {
    Navbar,
    SecondNavbar,
  },
  mounted() {
    this.FetchPost();
  },
  methods: {
    shorterPostName(postName) {
      return postName.length > 10
        ? `${postName.substring(0, 10)}...`
        : postName;
    },
    async FetchPost() {
      try {
        this.loading = true;
        const response = await this.$http.get(
          "http://localhost:8080/adopt-post-per-page",
        );
        this.post = response.data;
        console.log("ADOPT RESPONSE", response.data);
      } catch (error) {
        console.log("error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.v-row {
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
}
.v-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 0.8rem;
  border-radius: 0.8rem;
  overflow: hidden;
}

.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
img {
  object-fit: cover;
  overflow: hidden;
  height: 20vh;
}
</style>
