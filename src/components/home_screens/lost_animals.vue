<template>
  <div class="d-flex flex-row items-center justify-between pt-10">
    <h1 class="font-weight-regular">Izgubljene životinje</h1>
    <router-link to="izgubljeni"
      ><v-btn variant="outlined" color="primary"
        >Prikaži sve</v-btn
      ></router-link
    >
  </div>
  <v-row class="pt-5">
    <v-col v-for="post in post" :key="post.id" cols="12" sm="6" md="4" xl="2">
      <v-skeleton-loader
        class="border"
        v-if="loading"
        max-width="300"
        type="image, article"
      ></v-skeleton-loader>
      <router-link
        class="text-decoration-none"
        v-else
        :to="`/izgubljeni/${post.id}`"
      >
        <v-card>
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
              {{ shorterPostName(post.name) }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div>
              <v-icon class="mr-1" color="primary">mdi-map-marker</v-icon
              >{{ post.location }}
            </div>
            <div>
              <v-icon class="mr-1" color="primary">{{
                post.category === "macka"
                  ? "mdi-cat"
                  : post.category === "pas"
                    ? "mdi-dog"
                    : "mdi-paw"
              }}</v-icon
              >{{ post.category }}
            </div>
            <div>{{ post.sex }}</div>
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
          "http://localhost:8080/latest-lost-post",
        );
        this.post = response.data;
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
