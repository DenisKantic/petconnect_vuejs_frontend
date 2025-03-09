<template>
  <v-container class="px-0 px-lg-16 mx-auto">
    <h1 class="pt-10">Oglasi udomljavanja</h1>
    <span class="text-body-1 text-blue">
      Dostupan broj oglasa:
      {{ adoptPost?.length === 0 ? 0 : 3 - adoptPost.length }}
    </span>
    <v-row class="pt-5">
      <!-- Loop to create up to 3 cards -->
      <v-col
        v-for="index in 3"
        :key="index"
        cols="12"
        xs="4"
        sm="6"
        md="4"
        xl="4"
      >
        <template v-if="index <= adoptPost.length">
          <!-- Existing Post Card -->
          <v-card>
            <v-img
              :src="`http://localhost:8080/${adoptPost[index - 1].images[0]}`"
              aspect-ratio="2"
            ></v-img>

            <v-card-title>
              <div class="text-h6">{{ shortPostName(adoptPost[index - 1].pet_name) }}</div>
            </v-card-title>
            <v-card-subtitle class="pb-2 text-body-1">
              <div>
                <v-icon color="primary" class="mr-1">mdi-map-marker</v-icon
                >{{ adoptPost[index - 1].location }}
              </div>
              <div>
                <v-icon color="primary" class="mr-1">mdi-paw</v-icon
                >{{ adoptPost[index - 1].category }}
              </div>
              <div>
                <v-icon color="primary" class="mr-1"
                  >mdi-gender-male-female</v-icon
                >{{ adoptPost[index - 1].sex }}
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
                class="flex-grow-1"
                @click="confirmDelete(adoptPost[index - 1].id)"
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
            <router-link to="/profil/kreirajoglas/udomi"
              ><v-btn color="primary" size="large"> + Dodaj Oglas </v-btn>
            </router-link>
          </v-card>
        </template>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" hide-overlay>
      <v-card max-width="500" class="mx-auto">
        <v-card-title class="text-center">
          Da li ste sigurni da želite obrisati objavu?
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="flat" @click="deletePost(post_to_delete)"
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
      adoptPost: [],
      dialog: false,
      post_to_delete: null,
    };
  },
  methods: {
    shortPostName(name){
      if(name.length > 10){
        return `${name.substring(0,10)}...`
      } else {
        return name
      }
    },
    confirmDelete(postID) {
      this.post_to_delete = postID;
      this.dialog = true;
    },
    deletePost(postID) {
      axios
        .delete(`http://localhost:8080/delete-post/${postID}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          this.dialog = false;
          console.log("FIRING FUNCTION");
          this.getAdoptPost();
          console.log("EXITING FUNCTION");
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    },
    async getAdoptPost() {
      await axios
        .get(`http://localhost:8080/my-adopt-post`, { withCredentials: true })
        .then((response) => {
          this.adoptPost = response.data;
        })
        .catch((error) => {
          console.log("ERROR");
        });
    },
  },
  mounted() {
    this.getAdoptPost();
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
