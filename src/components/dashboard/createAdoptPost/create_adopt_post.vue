<template>
  <v-app id="container">
    <p class="text-center pt-5 text-h6">Kreiraj oglas za udomljavanje</p>
    <v-card>
      <v-card-title class="text-h6 pt-5 font-weight-regular">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              v-model="petName"
              label="Ime ljubimca"
              placeholder="Unesite ime ljubimca"
            ></v-text-field>
            <p>Vrsta životinje</p>
            <v-radio-group v-model="animalCategory">
              <v-radio label="Pas" color="primary" value="pas"></v-radio>
              <v-radio label="Mačka" color="primary" value="macka"></v-radio>
              <v-radio label="Ostalo" color="primary" value="ostalo"></v-radio>
            </v-radio-group>

            <p>Spol</p>
            <v-radio-group v-model="animalGender">
              <v-radio label="Mužjak" color="primary" value="muzjak"></v-radio>
              <v-radio label="Ženka" color="error" value="zenka"></v-radio>
            </v-radio-group>

            <p>Da li je životinja vakcinisana?</p>
            <v-radio-group v-model="vaccinated">
              <v-radio label="Da" color="primary" value="da"></v-radio>
              <v-radio label="Ne" color="error" value="ne"></v-radio>
            </v-radio-group>

            <p>Da li je životinja čipovana?</p>
            <v-radio-group v-model="chipped">
              <v-radio label="Da" color="primary" value="da"></v-radio>
              <v-radio label="Ne" color="error" value="ne"></v-radio>
            </v-radio-group>

            <p>Lokacija</p>
            <v-select v-model="location" :items="locations"></v-select>

            <v-textarea
              label="Opis"
              rows="8"
              no-resize
              counter
              v-model="description"
              :rules="rules"
              placeholder="Ovdje napišite opis"
            ></v-textarea>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <VFileUpload
              class="upload"
              density="compact"
              show-size
              accept="image/png, image/jpg, image/jpeg"
              scrim="primary"
              clearable
              multiple
              @update:model-value="handleFileUpload"
              title="Kliknite ovdje ili prenesite fotografije"
              label="Upload Images"
              prepend-outer-icon="mdi-file"
            >
              <template v-slot:upload>
                <v-btn color="primary">Custom Browse File</v-btn>
                <!-- Custom button label -->
              </template>
            </VFileUpload>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <h3 class="text-h6 font-weight-light mb-2">
              Oglas je uspješno kreiran!
            </h3>
            <v-btn @click="submitForm" color="primary" variant="flat"
              >SUBMIT</v-btn
            >
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn v-if="step > 1" variant="text" @click="prevStep"> Nazad </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step < 3" color="primary" variant="flat" @click="nextStep">
          Dalje
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { ref } from "vue";

export default {
  components: {
    VFileUpload,
  },
  data() {
    const step = ref(1);

    return {
      rules: [(v) => v.length <= 1500 || "Maksimalno 1500 karaktera"],
      locations: [
        "Tuzla",
        "Sarajevo",
        "Zenica",
        "Mostar",
        "Tuzla",
        "Sarajevo",
        "Zenica",
        "Mostar",
        "Tuzla",
        "Sarajevo",
        "Zenica",
        "Mostar",
        "Tuzla",
        "Sarajevo",
        "Zenica",
        "Mostar",
      ],
      location: "Izaberite",
      petName: "",
      animalCategory: "",
      animalGender: "",
      vaccinated: "",
      chipped: "",
      description: "",
      uploadedImages: [],
      step: 1,
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Upišite informacije";
        case 2:
          return "Postavite fotografije";
        default:
          return "";
      }
    },
  },
  methods: {
    prevStep() {
      if (this.step > 1) {
        this.step--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    nextStep() {
      if (this.step < 3) {
        this.step++;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    handleFileUpload(files) {
      this.uploadedImages = files;
    },
    submitForm() {
      const formData = new FormData();

      console.log(
        "DATA",
        "location",
        this.location,
        this.petName,
        "\n",
        "animal category",this.animalCategory,
        "\n",
        "animal gender",this.animalGender,
        "\n",
        this.vaccinated,
        "\n",
        this.chipped,
        "\n",
        this.description,
      );

      formData.append("category", this.animalCategory);
      formData.append("petName", this.petName);
      formData.append("description", this.description);
      formData.append("sex", this.animalGender);
      formData.append("vaccinated", this.vaccinated === "da"); // Convert string to boolean
      formData.append("chipped", this.chipped === "da"); // Convert string to boolean
      formData.append("location", this.location);

      // Append images correctly
      this.uploadedImages.forEach((file) => {
        formData.append("images", file); // Each file must be appended individually
      });

      this.$http
        .post("http://localhost:8080/create-adopt-post", formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    },
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  background-color: #e5e5e5;
  min-height: 60vh;
  overflow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.v-card {
  margin: 2rem auto;
  width: 50%;
}
</style>

<!-- 
Name        string `form:"name" binding:"required"`
	Category    string `form:"category" binding:"required"`
	PetName     string `form:"petName" binding:"required"`
	Description string `form:"description" binding:"required"`
	Sex         string `form:"sex" binding:"required"`
	Vaccinated  bool   `form:"vaccinated"`
	Chipped     bool   `form:"chipped"`
	Location    string `form:"location" binding:"required"`
	Images      []string -->
