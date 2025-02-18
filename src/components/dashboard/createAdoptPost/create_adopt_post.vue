<template>
  <v-app id="container">
    <v-card :disabled="isCardDisabled">
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-item :value="!step === 1 ? 1 : 1" :complete="step >= 2">
            <template v-slot:title
              ><span class="d-none d-sm-block">Informacije</span>
            </template>
          </v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item :value="!step === 2 ? 2 : 2" :complete="step >= 3">
            <template v-slot:title
              ><span class="d-none d-sm-block">Fotografije</span>
            </template>
          </v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item :value="!step === 3 ? 3 : 3" :complete="step >= 4">
            <template v-slot:title>
              <span class="d-none d-sm-block">Pregled objave</span>
            </template>
          </v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item :value="!step === 4 ? 4 : 4" :complete="step === 4">
            <template v-slot:title>
              <span class="d-none d-sm-block">Objava</span>
            </template>
          </v-stepper-item>
        </v-stepper-header>
      </v-stepper>
      <!-- <v-progress-linear
        min="0"
        max="4"
        buffer-color="#2196f3"
        buffer-opacity="1"
        color="info"
        :buffer-value="step"
        :height="10"
      ></v-progress-linear> -->
      <v-window v-model="step">
        <v-window-item :value="1">
          <p class="text-h6 text-center font-weight-light my-4">
            Kreiraj oglas za udomljavanje
          </p>
          <v-card-title class="text-h6 pt-5 font-weight-regular">
            <span>{{ currentTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              counter
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

            <v-select
              label="Izaberite lokaciju"
              v-model="location"
              :items="locations"
            ></v-select>

            <p>Detaljni opis</p>
            <v-textarea
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
          <p class="text-h6 text-center font-weight-light my-4">
            Unesite fotografije <br />
            (5 fotografija maksimalno)
          </p>
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
              :model-value="uploadedImages"
              title="Kliknite ovdje ili prenesite fotografije"
              label="Upload Images"
              prepend-outer-icon="mdi-file"
            >
              <template v-slot:prepend>
                <v-avatar size="150" rounded></v-avatar>
              </template>
              <template v-slot:clear="{ props: clearProps }">
                <v-btn
                  size="large"
                  variant="text"
                  color="red"
                  v-bind="clearProps"
                ></v-btn>
              </template>
            </VFileUpload>
          </v-card-text>
        </v-window-item>

        <v-window-item style="width: 100%" :value="3">
          <h3 class="text-h6 text-center font-weight-light my-4">
            Pregled oglasa prije objave!
          </h3>
          <div class="text-start pa-4 font-weight-light">
            <p class="pb-2 font-weight-bold">
              Ime životinje: <br />
              <span class="font-weight-light">{{ petName }}</span>
            </p>
            <p class="pb-2">
              Vrsta životinje: <br />
              {{ animalCategory }}
            </p>
            <p class="pb-2">
              Spol: <br />
              {{ animalGender }}
            </p>
            <p class="pb-2">
              Da li je životinja vakcinisana: <br />
              {{ vaccinated }}
            </p>
            <p class="pb-2">
              Da li je životinja čipovana: <br />
              {{ chipped }}
            </p>
            <p class="pb-2">
              Lokacija: <br />
              {{ location }}
            </p>
            <p>Fotografije:</p>
            <div class="image-preview">
              <v-img
                v-for="(url, index) in imageURLs"
                :key="index"
                :model-value="imageURLs"
                :src="url"
                :lazy-src="url"
                aspect-ratio="1"
                class="my-4"
              >
                <!--  -->
                <template v-slot:placeholder>
                  <v-skeleton-loader
                    type="image"
                  ></v-skeleton-loader> </template
              ></v-img>
            </div>

            <br />
          </div>
        </v-window-item>

        <v-window-item id="fourth-container" :value="4">
          <v-icon size="40" color="green">mdi-check-circle-outline</v-icon>
          <p>Objava je uspješno kreirana</p>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions v-show="step != 4">
        <v-btn
          :disabled="isNazadBtnDisabled"
          v-if="step >= 1 && step < 4"
          variant="text"
          @click="prevStep"
        >
          Nazad
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step === 3"
          :loading="isBtnLoading"
          :disabled="isBtnDisabled"
          @click="submitForm"
          color="primary"
          variant="flat"
          >KREIRAJ OBJAVU</v-btn
        >
        <v-btn v-if="step < 3" color="primary" variant="flat" @click="nextStep">
          Dalje
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
      <template #action>
        <v-btn color="white" text @click="snackbar.visible = false"
          >Zatvori</v-btn
        >
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { VFileUpload } from "vuetify/labs/VFileUpload";

export default {
  components: {
    VFileUpload,
  },
  data() {
    return {
      snackbar: {
        visible: false,
        message: "",
        timeout: 2000,
        color: "success",
      },
      rules: [(v) => v.length <= 1500 || "Maksimalno 1500 karaktera"],
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
      petName: "",
      animalCategory: "",
      animalGender: "",
      vaccinated: "",
      chipped: "",
      description: "",
      uploadedImages: [],
      imageURLs: [],
      step: 1,
      isCardDisabled: false,
      isBtnDisabled: false,
      isBtnLoading: false,
      isNazadBtnDisabled: false,
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
    //   setLoaded(index) {
    //   this.imageLoadStates[index] = false; // Set specific image as loaded
    // },
    showSnackbar(message, color) {
      this.snackbar.visible = true;
      this.snackbar.message = message;
      this.snackbar.color = color;
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    nextStep() {
      if (this.step === 1) {
        if (
          this.location &&
          this.petName &&
          this.animalCategory &&
          this.animalGender &&
          this.vaccinated &&
          this.chipped &&
          this.description
        ) {
          this.step++;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          this.showSnackbar("Niste popunili sva polja.", "error");
        }
      }

      // check for second page for images
      else if (this.step === 2) {
        // Ensure at least one image has been uploaded
        if (this.uploadedImages.length > 0) {
          this.step++;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          this.showSnackbar("Niste dodali fotografije", "error");
        }
      } else if (this.step === 3) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (this.step === 4) {
        console.log("FUNCTION FIRED UP");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    handleFileUpload(files) {
      const fileArray = Array.from(files);
      const [validTypes] = ["image/png", "image/jpeg", "image/jpg"];
      const filteredFiles = fileArray.filter((file) =>
        validTypes.includes(file.type),
      );

      if (fileArray.length > 6) {
        this.showSnackbar("Ne možete objaviti više od 6 fotografija", "error");
        this.uploadedImages = fileArray.slice(0, 6);
        this.imageURLs = this.uploadedImages.map((file) =>
          URL.createObjectURL(file),
        );
        console.log("FIRST ARRAY", this.uploadedImages);
      } else if (filteredFiles.length === 0) {
        this.showSnackbar(
          "Molimo odaberite validne formate fotografija (PNG, JPG, JPEG)",
          "error",
        );
        this.uploadedImages = [];
        this.imageURLs = [];
      } else {
        this.uploadedImages = fileArray;
        this.imageURLs = this.uploadedImages.map((file) =>
          URL.createObjectURL(file),
        );
        console.log("URL IMGES", this.imageURLs);
      }

      this.$emit("update:model-value", this.uploadedImages);
      this.$emit("update:model-value", this.imageURLs);
    },
    submitForm() {
      const formData = new FormData();
      this.isCardDisabled = true;
      this.isBtnDisabled = true;
      this.isBtnLoading = true;
      this.isNazadBtnDisabled = true;

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

      setTimeout(() => {
        this.$http
          .post("http://localhost:8080/create-adopt-post", formData, {
            withCredentials: true,
          })
          .then((res) => {
            this.step = 4;
            setTimeout(() => {
              window.location.replace("/profil");
            }, 1500);
            console.log(res.data);
          })
          .catch((err) => {
            console.log("ERROR", err);
          });
        this.isCardDisabled = false;
        this.isBtnDisabled = false;
        this.isBtnLoading = false;
        this.isNazadBtnDisabled = false;
      }, 1500);
    },
    onBeforeUnmount() {
      this.imageURLs.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    },
  },
};
</script>

<style scoped>
.image-preview {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 3rem auto;
}

@media (max-width: 600px) {
  .image-preview {
    grid-template-columns: repeat(1, 1fr);
    margin: auto;
    width: 100%;
    background-color: green;
  }
}

.image-preview .v-img {
  margin: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.1);
}
#container {
  width: 100%;
  background-color: #e5e5e5;
  min-height: 60vh;
  overflow: none;
}
.v-card {
  margin: 4rem auto;
  width: 50%;
}

#fourth-container {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#fourth-container .v-icon {
  padding: 2rem;
  display: flex;
}

#delete-btn {
  padding: 2rem;
}

/* responsive media*/
@media (min-width: 200px) and (max-width: 599px) {
  .v-card {
    width: 90%;
  }
}

@media (min-width: 600px) and (max-width: 1000px) {
  .v-card {
    width: 80%;
  }
}
</style>
