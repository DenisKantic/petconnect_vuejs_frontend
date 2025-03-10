<template>
  <v-container class="px-0 px-lg-16 mx-auto">
    <h1 class="pt-10">Donacijski oglasi</h1>
    <span class="text-body-1 text-blue">
      Dostupan broj oglasa:
      {{ donationPost?.length === 0 ? 0 : 3 - donationPost?.length }}
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
        <template v-if="index <= donationPost?.length">
          <!-- Existing Post Card -->
          <v-card>
            <v-img
              :src="`http://localhost:8080/${donationPost[index - 1].images[0]}`"
              aspect-ratio="2"
            ></v-img>

            <v-card-title>
              <div class="text-h6">
                {{ shortPostName(donationPost[index - 1].post_name) }}
              </div>
            </v-card-title>
            <v-card-subtitle class="pb-2 text-body-1">
              <div>
                <v-icon color="primary" class="mr-1">mdi-map-marker</v-icon
                >{{ donationPost[index - 1].location }}
              </div>
              <div>
                <v-icon color="primary" class="mr-1">mdi-paw</v-icon
                >{{ donationPost[index - 1].animal_category }}
              </div>
              <div>
                <v-icon color="primary" class="mr-1">mdi-post</v-icon
                >{{ donationPost[index - 1].post_category }}
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
              <v-btn color="red" class="flex-grow-1">Obriši</v-btn>
            </div>
          </v-card>
        </template>

        <template v-else>
          <!-- Create Post Button in Empty Slot -->
          <v-card
            class="d-flex align-center justify-center flex-grow-1"
            height="100%"
          >
            <router-link to="/profil/kreirajoglas/donacije"
              ><v-btn color="primary" size="large"> + Dodaj Oglas </v-btn>
            </router-link>
          </v-card>
        </template>
      </v-col>
    </v-row>
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
      donationPost: [],
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
    async getAdoptPost() {
      await axios
        .get("http://localhost:8080/my-donation-post", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.length > 0) {
            this.donationPost = response.data;
          } else {
            this.donationPost = "";
          }
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
