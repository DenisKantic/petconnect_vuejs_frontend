<template>
  <div class="d-flex flex-row items-center justify-between pt-10">
    <h1 class="font-weight-regular">Donacijski oglasi</h1>
    <router-link to="donacije"
      ><v-btn variant="outlined" color="primary"
        >Prikaži sve</v-btn
      ></router-link
    >
  </div>
  <v-row class="pt-5">
    <v-col
      v-for="post in post"
      :key="post.id"
      cols="12"
      sm="6"
      md="4"
      lg="2"
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
          <div class="text-h6">{{ shorterPostName(post.post_name) }}</div>
        </v-card-title>
        <v-card-subtitle>
          <div>
            <v-icon class="mr-1" color="primary">mdi-map-marker</v-icon
            >{{ post.location }}
          </div>
          <div>
            <div class="pt-1">
              <v-icon class="mr-1" color="info">{{
                post.animal_category === "macka"
                  ? "mdi-cat"
                  : post.animal_category === "pas"
                    ? "mdi-dog"
                    : "mdi-paw"
              }}</v-icon
              >{{
                post.animal_category.charAt(0).toUpperCase() +
                post.animal_category.slice(1)
              }}
            </div>
          </div>
          <div>
            <v-icon class="mr-1" color="primary">{{
              post.post_category === "hrana"
                ? "mdi-food"
                : post.post_category === "lijek"
                  ? "mdi-medical-bag"
                  : "mdi-view-grid"
            }}</v-icon
            >{{
              post.post_category.charAt(0).toUpperCase() +
              post.post_category.slice(1)
            }}
          </div>
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
      loading: true,
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
      this.loading = true;
      try {
        const response = await this.$http.get(
          "http://localhost:8080/latest-donation-post",
        );
        this.post = response.data;
        console.log("DONTION RES", response.data);
        console.log("TESTING", this.post[0].images.length);
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
  display: flex;
  flex-direction: row;
}
.v-card {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding-bottom: 0.8rem;
  border-radius: 0.8rem;
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
