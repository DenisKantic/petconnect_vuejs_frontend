<template>
  <div class="d-flex flex-row items-center justify-between" style="gap: 0.5rem">
    <h1 class="text-h5 text-md-h4 font-weight-regular">Udomi ljubimca</h1>
    <router-link to="/udomi"
      ><v-btn variant="outlined" color="primary"
        >Prikaži sve</v-btn
      ></router-link
    >
  </div>
  <div class="d-flex flex-column align-center" v-show="showError">
  <p class="text-center">Desila se greška</p>
  <v-img src="/src/assets/not_found.svg" width="200"></v-img>
</div>
 <v-row>
    <v-row v-if="loading">
      <v-col
        v-for="index in 6"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        xl="2"
      >
        <v-skeleton-loader
          class="border"
          max-width="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-col
      v-else
      v-for="post in post"
      :key="post.id"
      cols="12"
      sm="6"
      md="4"
      lg="2"
      xl="2"
    >
      <router-link :to="`/udomi/${post.id}`" class="text-decoration-none">
        <v-card>
          <img
            :src="
              post.images.length > 0
                ? `${this.apiUrl}/${post.images[0]}`
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
                  post.sex === "muzjak"
                    ? "mdi-gender-male"
                    : "mdi-gender-female"
                }}</v-icon
              >{{ post.sex === "muzjak" ? "Mužjak" : "Ženka" }}
            </div>
          </v-card-subtitle>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      post: [],
      loading: true,
      showError: false,
    };
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await this.$http.get(
          `${this.apiUrl}/latst-adopt-post`,
        );
        this.post = response.data;
        // this.post = [
        //   {id: 2,
        //   images: "test",
        //   pet_name: "test",
        //   location: "test",
        //   category: "macka",
        //   sex: "musko",
        // }]

        this.loading = false;
      } catch (error) {
        console.log("error");
        this.showError = true;
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
