<template>
  <Navbar />
  <SecondNavbar />

  <h1 class="font-weight-regular">Izgubljeni ljubimci</h1>

  <div class="pt-4" width="300px">
    <!-- Combined filter button -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" variant="outlined" v-bind="props">
          <v-icon class="mr-1">mdi-filter</v-icon>Filteri
        </v-btn>
      </template>

      <!-- Location filter -->

      <v-card width="250px" class="pa-4">
        <v-card-title class="text-center pb-5">Filteri</v-card-title>

        <v-select
          title="Lokacija"
          label="Lokacija"
          v-model="location"
          :items="locations"
          variant="outlined"
          clearable
          color="primary"
          @click.stop
        ></v-select>

        <v-select
          label="Vrsta životinje"
          variant="outlined"
          v-model="selectedAnimal"
          :items="animalList"
          clearable
          color="primary"
          @click.stop
        ></v-select>

        <v-btn class="font-weight-regular" @click="FetchPost" color="primary"
          >Pretraži</v-btn
        >
      </v-card>
    </v-menu>
  </div>

  <p class="pt-4 pb-2 font-weight-regular">
    Ukupno rezultata:
    <span class="text-h6 font-weight-regular">{{
      isNaN(total_pages.total_count)
        ? 0
          ? totalPages.total_count < 0
          : 0
        : total_pages.total_count
    }}</span>
  </p>
  <p v-if="post?.length === 0">Nema pronađenih životinja</p>

  <v-row v-else>
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
      <router-link
        class="text-decoration-none"
        v-else
        :to="{ name: 'Izgubljeni ljubimac', params: { id: post.id } }"
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
  <v-pagination
    class="py-5"
    v-model="page_number"
    :length="totalPages"
    :total-visible="6"
    @change="FetchPost"
  ></v-pagination>
</template>

<script>
import Navbar from "../navbar/main_navbar.vue";
import SecondNavbar from "../navbar/second_navbar.vue";

export default {
  data() {
    return {
      post: [],
      page_number: 1,
      page_size: 20,
      total_pages: 1,
      locations: [
        "Banja Luka",
        "Bihać",
        "Bijeljina",
        "Bosanska Gradiška",
        "Bosanska Krupa",
        "Bosanski Brod",
        "Bosanski Novi",
        "Bosanski Petrovac",
        "Brčko",
        "Breza",
        "Bugojno",
        "Busovača",
        "Cazin",
        "Čapljina",
        "Čelić",
        "Čelinac",
        "Čitluk",
        "Derventa",
        "Doboj",
        "Donji Vakuf",
        "Drvar",
        "Fojnica",
        "Gacko",
        "Glamoč",
        "Goražde",
        "Gornji Vakuf-Uskoplje",
        "Gračanica",
        "Gradačac",
        "Hadžići",
        "Han Pijesak",
        "Ilidža",
        "Ilijaš",
        "Jablanica",
        "Jajce",
        "Kakanj",
        "Kalesija",
        "Kalinovik",
        "Kiseljak",
        "Kladanj",
        "Ključ",
        "Konjic",
        "Kotor Varoš",
        "Kreševo",
        "Kupres",
        "Laktaši",
        "Lopare",
        "Ljubinje",
        "Ljubuški",
        "Lukavac",
        "Maglaj",
        "Milići",
        "Modriča",
        "Mostar",
        "Mrkonjić Grad",
        "Neum",
        "Nevesinje",
        "Novi Travnik",
        "Odžak",
        "Orašje",
        "Pale",
        "Posušje",
        "Prijedor",
        "Prnjavor",
        "Prozor-Rama",
        "Rogatica",
        "Rudo",
        "Sanski Most",
        "Sapna",
        "Sarajevo",
        "Šamac",
        "Šekovići",
        "Šipovo",
        "Sokolac",
        "Srebrenica",
        "Srebrenik",
        "Široki Brijeg",
        "Stolac",
        "Teočak",
        "Teslić",
        "Tešanj",
        "Tomislavgrad",
        "Travnik",
        "Trebinje",
        "Trnovo",
        "Tuzla",
        "Ugljevik",
        "Vareš",
        "Velika Kladuša",
        "Visoko",
        "Vitez",
        "Višegrad",
        "Vogošća",
        "Zavidovići",
        "Zenica",
        "Zvornik",
        "Žepče",
        "Živinice",
      ],
      location: "",
      animalList: [
        { title: "Pas", value: "pas" },
        { title: "Mačka", value: "macka" },
        { title: "Ostalo", value: "ostalo" },
      ],
      selectedLocation: "",
      selectedAnimal: "",
      loading: true,
    };
  },
  components: {
    Navbar,
    SecondNavbar,
  },
  computed: {
    totalPages() {
      // Check if total_count exists and ensure it's a number
      const totalCount =
        this.total_pages && this.total_pages.total_count
          ? this.total_pages.total_count
          : 0;
      // Calculate total pages, ensuring it's at least 1
      return Math.max(1, Math.ceil(totalCount / this.page_size));
    },
  },
  methods: {
    shorterPostName(postName) {
      return postName.length > 10
        ? `${postName.substring(0, 10)}...`
        : postName;
    },
    async FetchPost() {
      this.total_pages = "";
      this.post = [];
      this.loading = true;
      let params = {
        page: this.page_number,
        page_size: this.page_size,
        location: this.location,
        animal: this.selectedAnimal,
      };

      try {
        this.loading = true;
        const response = await this.$http.get(
          "http://localhost:8080/lost-post-per-page",
          { params },
        );
        console.log("RESPONSE", response.data);
        this.post = response.data.posts;
        this.total_pages = response.data.total_count;
      } catch (error) {
        console.log("error");
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    page_number() {
      this.FetchPost();
    },
  },
  mounted() {
    this.FetchPost();
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

@media (min-width: 200px) and (max-width: 800px) {
  .filter-menu {
    overflow-y: scroll;
  }
}
</style>
