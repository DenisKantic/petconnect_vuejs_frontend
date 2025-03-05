<template>
  <Navbar />
  <SecondNavbar />

  <h1>Udomi ljubimca</h1>

  <div class="filter-menu pt-4">
    <!-- location menu -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="mr-4 font-weight-regular"
          color="primary"
          variant="outlined"
          v-bind="props"
        >
          Lokacija
        </v-btn>
      </template>
      <v-list>
        <v-chip
          v-show="selectedLocation != ''"
          class="ma-2"
          closable
          @click:close="removeLocationChip"
        >
          {{ selectedLocation }}
        </v-chip>

        <v-list-item
          v-for="(item, index) in location"
          :key="index"
          @click="selectLocation(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- animal choise menu  -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="mr-4 font-weight-regular"
          variant="outlined"
          color="primary"
          v-bind="props"
        >
          Životinja
        </v-btn>
      </template>
      <v-list>
        <v-chip
          v-show="selectedAnimal != ''"
          class="ma-2"
          closable
          @click:close="removeAnimalChip"
        >
          {{ selectedAnimal.title }}
        </v-chip>

        <v-list-item
          v-for="(item, index) in animalList"
          :key="index"
          @click="selectAnimal(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- sex -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="mr-4 font-weight-regular"
          variant="outlined"
          color="primary"
          v-bind="props"
        >
          Spol
        </v-btn>
      </template>
      <v-list>
        <v-chip
          v-show="selectedSex != ''"
          class="ma-2"
          closable
          @click:close="removeSexChip"
        >
          {{ selectedSex.title }}
        </v-chip>

        <v-list-item
          v-for="(item, index) in sexGenders"
          :key="index"
          @click="selectSex(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- chipped status menu -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="mr-4 font-weight-regular"
          variant="outlined"
          color="primary"
          v-bind="props"
        >
          Čipovana
        </v-btn>
      </template>
      <v-list>
        <v-chip
          v-show="selectedChipStatus != ''"
          class="ma-2"
          closable
          @click:close="removeChippedChip"
        >
          {{ selectedChipStatus.title }}
        </v-chip>

        <v-list-item
          v-for="(item, index) in chipOption"
          :key="index"
          @click="selectChipStatus(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Vakcinisan menu-->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="mr-4 font-weight-regular"
          variant="outlined"
          color="primary"
          v-bind="props"
        >
          Vakcinisan
        </v-btn>
      </template>
      <v-list>
        <v-chip
          v-show="selectedVaccine != ''"
          class="ma-2"
          closable
          @click:close="removeVaccineChip"
        >
          {{ selectedVaccine.title }}
        </v-chip>

        <v-list-item
          v-for="(item, index) in vaccineOption"
          :key="index"
          @click="selectVaccineStatus(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn class="font-weight-regular" @click="FetchPost" color="primary"
      >Pretraži</v-btn
    >
    <!-- <v-btn color="warning" @click="deleteFilters" v-show="selectedLocation != '' || selectedSex !='' || selectedVaccine != ''">Obriši filtere</v-btn> -->
  </div>

  <p class="pt-4 pb-2 font-weight-regular">
    Ukupno rezultata:
    <span class="text-h6 font-weight-regular">{{
      isNaN(total_pages.total_count - 1)
        ? 0
          ? totalPages.total_count - 1 < 0
          : 0
        : total_pages.total_count - 1
    }}</span>
  </p>
  <p v-if="post.length === 0">Nema pronadjenih zivotinja</p>

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
        v-else
        :to="{ name: 'Detaljan pregled', params: { id: post.id } }"
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
      page_size: 12 + 1,
      total_pages: 1,
      location: ["Banja Luka", "Tuzla"],
      sexGenders: [
        { title: "Mužjak", value: "muzjak" },
        { title: "Ženka", value: "zenka" },
      ],
      animalList: [
        { title: "Pas", value: "pas" },
        { title: "Mačka", value: "macka" },
        { title: "Ostalo", value: "ostalo" },
      ],
      chipList: [{ title: "" }],
      chipOption: [
        {
          title: "Da",
          value: "true",
        },
        { title: "Ne", value: "false" },
      ],
      vaccineOption: [
        {
          title: "Da",
          value: "true",
        },
        { title: "Ne", value: "false" },
      ],
      selectedLocation: "",
      selectedSex: "",
      selectedVaccine: "",
      selectedChipStatus: "",
      sex: "muzjak",
      vaccinated: "true",
      loading: true,
    };
  },
  components: {
    Navbar,
    SecondNavbar,
  },
  computed: {
    totalPages() {
      const number = Math.ceil(this.total_pages.total_count / this.page_size);
      return number;
    },
  },
  methods: {
    selectLocation(item) {
      this.selectedLocation = item;
    },
    selectSex(item) {
      this.selectedSex = item;
    },
    selectVaccineStatus(item) {
      this.selectedVaccine = item;
    },
    selectAnimal(item) {
      this.selectedAnimal = item;
    },
    selectChipStatus(item) {
      this.selectedChipStatus = item;
    },
    removeLocationChip() {
      this.selectedLocation = "";
    },
    removeSexChip() {
      this.selectedSex = "";
    },
    removeVaccineChip() {
      this.selectedVaccine = "";
    },
    removeAnimalChip() {
      this.selectedAnimal = "";
    },
    removeChippedChip() {
      this.selectedChipStatus = "";
    },
    // deleteFilters(){
    //   this.selectedVaccine = ""
    //   this.selectedLocation = "",
    //   this.selectedSex = ""
    // },
    shorterPostName(postName) {
      return postName.length > 10
        ? `${postName.substring(0, 10)}...`
        : postName;
    },
    async FetchPost() {
      this.post = [];
      this.loading = true;
      let params = {
        page: this.page_number,
        page_size: this.page_size,
        location: this.selectedLocation,
        sex: this.selectedSex.value,
        vaccinated: this.selectedVaccine.value,
        chipped: this.selectedChipStatus.value,
        // animal: this.selectedAnimal.value
      };

      try {
        this.loading = true;
        const response = await this.$http.get(
          "http://localhost:8080/adopt-post-per-page",
          { params },
        );
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

.filter-menu {
  width: 100%;
}

@media (min-width: 200px) and (max-width: 800px) {
  .filter-menu {
    overflow-y: scroll;
  }
}
</style>
