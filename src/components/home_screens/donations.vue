<template>
  <div
    class="d-flex flex-row items-center justify-between pt-10"
    style="gap: 0.5rem"
  >
    <h1 class="text-h5 text-md-h4 font-weight-regular">Donacijski oglasi</h1>
    <router-link to="donacije"
      ><v-btn variant="outlined" color="primary"
        >Prikaži sve</v-btn
      ></router-link
    >
  </div>
  <div v-show="showError" class="mx-auto text-center">
  <v-icon color="red" size="50">mdi-alert</v-icon>
  <p class="text-h5 pt-4">Desila se greška</p>
</div>
  <v-row class="pt-5">
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
      <router-link class="text-decoration-none" :to="`/donacije/${post.id}`">
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
              {{ shorterPostName(post.post_name) }}
            </div>
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
      this.loading = true;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await this.$http.get(
          `${this.apiUrl}/latest-donation-post`,
        );
        this.post = response.data;
        // this.post = [
        //   {
        //     id: 2,
        //     images: "test",
        //     post_name: "test",
        //     location: "test",
        //     animal_category: "test",
        //     post_category: "test"
        //   }
        // ]
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
