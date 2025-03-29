<template>
  <v-container class="px-0 px-lg-16 mx-auto">
    <h1 class="pt-10">Izgubljeni ljubimci</h1>
    <span class="text-body-1 text-blue"> Dostupan broj oglasa: </span>
    <v-row class="pt-5">
      <v-row v-if="loading">
        <v-col
          v-for="index in 3"
          :key="index"
          cols="12"
          xs="4"
          sm="6"
          lg="4"
          xl="4"
        >
          <v-skeleton-loader
            class="border"
            max-width="300"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <!-- Loop to create up to 3 cards -->
      <v-col
        v-else
        v-for="index in 3"
        :key="index"
        cols="12"
        xs="4"
        sm="6"
        md="4"
        xl="4"
      >
        <template v-if="index <= lostPost?.length">
          <!-- Existing Post Card -->
          <v-card>
            <v-img
              :src="`${this.apiUrl}/${lostPost[index - 1].images[0]}`"
              aspect-ratio="2"
            ></v-img>

            <v-card-title>
              <div class="text-h6">
                {{ shortPostName(lostPost[index - 1].name) }}
              </div>
            </v-card-title>
            <v-card-subtitle class="pb-2 text-body-1">
              <div>
                <v-icon color="primary" class="mr-1">mdi-map-marker</v-icon
                >{{ lostPost[index - 1].location }}
              </div>
              <div>
                <v-icon color="primary" class="mr-1">mdi-paw</v-icon
                >{{ lostPost[index - 1].category }}
              </div>
            </v-card-subtitle>
            <v-divider></v-divider>
            <div
              class="d-flex flex-column flex-lg-row mt-5"
              style="gap: 0.6rem"
            >
              <v-btn color="primary" class="flex-grow-1" variant="outlined">
                Podijeli <v-icon class="ml-1">mdi-facebook</v-icon>
              </v-btn>
              <v-btn color="primary" class="flex-grow-1">Uredi</v-btn>
              <v-btn
                color="red"
                @click="confirmDelete(lostPost[index - 1].id)"
                class="flex-grow-1"
                >Obriši</v-btn
              >
            </div>
          </v-card>
        </template>

        <template v-else>
          <!-- Create Post Button in Empty Slot -->
          <v-card
            class="d-flex align-center justify-center flex-grow-1"
            height="100%"
            style="min-height: 20vh"
          >
            <router-link to="/profil/kreirajoglas/izgubljeni"
              ><v-btn color="primary" size="large"> + Dodaj Oglas </v-btn>
            </router-link>
          </v-card>
        </template>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" hide-overlay>
      <v-card max-width="500" class="mx-auto" :loading="btnDelete">
        <v-card-title class="text-center">
          Da li ste sigurni da želite obrisati objavu?
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            variant="flat"
            :loading="btnDelete"
            @click="deletePost(post_to_delete)"
            >Obriši</v-btn
          >
          <v-btn color="primary" @click="dialog = false" variant="outlined"
            >Odustani</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "Pet Name",
      location: "Location",
      category: "Category",
      sex: "Male",
      loading: true,
      lostPost: [],
      dialog: false,
      btnDelete: false,
      post_to_delete: null,
    };
  },
  methods: {
    shortPostName(name) {
      if (name.length > 10) {
        return `${name.substring(0, 10)}...`;
      } else {
        return name;
      }
    },
    confirmDelete(postID) {
      this.post_to_delete = postID;
      this.dialog = true;
    },
    async deletePost(postID) {
      this.btnDelete = true;

      await new Promise((resolve) => setTimeout(resolve, 1500));

      await axios
        .delete(`${this.apiUrl}/delete-lost-post/${postID}`, {
          withCredentials: true,
        })
        .then((response) => {
          this.dialog = false;
          this.btnDelete = false;
          this.getlostPost();
        })
        .catch((error) => {
          console.log("ERROR");
          this.btnDelete = false;
        });
    },
    async getlostPost() {
      this.loading = true;

      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios
        .get(`${this.apiUrl}/my-lost-post`, { withCredentials: true })
        .then((response) => {
          if (response.data.length > 0) {
            this.lostPost = response.data;
          } else {
            this.lostPost = "";
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log("ERROR");
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getlostPost();
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

.v-img {
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-radius: 1rem;
}
</style>
