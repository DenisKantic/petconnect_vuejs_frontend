<template>
  <v-app id="container">
    <v-card :disabled="isCardDisabled">
      <v-stepper alt-labels v-show="step !== 4">
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
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-title class="text-h6 py-5 text-center font-weight-regular">
            <span>{{ currentTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="postName"
              :rules="postNameRules"
              counter
              label="Naziv objave"
              placeholder="Unesite naziv objave (npr. tablete za mačku...)"
            ></v-text-field>
            <p>Vrsta objave</p>
            <v-radio-group v-model="postCategory">
              <v-radio label="Hrana" color="primary" value="hrana"></v-radio>
              <v-radio label="Lijekovi" color="primary" value="lijek"></v-radio>
              <v-radio label="Ostalo" color="primary" value="ostalo"></v-radio>
            </v-radio-group>
            <p>Za životinju</p>
            <v-radio-group v-model="animalCategory">
              <v-radio label="Pas" color="primary" value="pas"></v-radio>
              <v-radio label="Mačka" color="primary" value="macka"></v-radio>
              <v-radio label="Ostalo" color="primary" value="ostalo"></v-radio>
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
            (6 fotografija maksimalno)
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
              Naziv objave: <br />
              <span class="font-weight-light">{{ postName }}</span>
            </p>
            <p class="pb-2 font-weight-bold">
              Vrsta oglasa <br />
              <span class="font-weight-light">{{ postCategory }}</span>
            </p>

            <p class="pb-2 font-weight-bold">
              Za životinju: <br />
              <span class="font-weight-light">{{ animalCategory }}</span>
            </p>

            <p class="pb-2 font-weight-bold">
              Lokacija: <br />
              <span class="font-weight-light">{{ location }}</span>
            </p>

            <p class="pb-2 font-weight-bold">
              Detaljan opis: <br />
              <span class="font-weight-light">{{ animalCategory }}</span>
            </p>

            <p class="pb-2 font-weight-bold text-center">Fotografije:</p>
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

        <v-window-item  :value="4">

        </v-window-item>
      </v-window>

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

    <v-sheet
    :value ="4"
            v-show="step === 4"
            class="pa-4 text-center mx-auto"
            elevation="12"
            max-width="600"
            rounded="lg"
            width="100%"
          >
            <v-icon
              class="mb-5"
              color="success"
              icon="mdi-check-circle"
              size="112"
            ></v-icon>

            <h2 class="text-h5 mb-6">Uspješno ste kreirali oglas</h2>

            <p class="mb-4 text-medium-emphasis text-body-2">
              Automatska redirekcija na Vaš profil...

              <br />

              Ukoliko Vas ne prebaci, <router-link to="/profil">kliknite ovdje</router-link>
            </p>

          </v-sheet>

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
      postNameRules: [(v) => v.length <= 30 || "Maksimalno 30 karaktera"],
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
      postName: "",
      animalCategory: "",
      postCategory: "",
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
          return "Oglas za donacije";
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
        if (this.description.length > 1500 || this.postName.length > 30) {
          this.showSnackbar("Niste ispravno popunili polja", "error");
          return;
        }
        if (
          this.location &&
          this.postName &&
          this.animalCategory &&
          this.postCategory &&
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

      formData.append("animalCategory", this.animalCategory);
      formData.append("postName", this.postName);
      formData.append("description", this.description);
      formData.append("postCategory", this.postCategory);
      formData.append("location", this.location);

      // Append images correctly
      this.uploadedImages.forEach((file) => {
        formData.append("images", file); // Each file must be appended individually
      });

      setTimeout(() => {
        this.$http
          .post("http://localhost:8080/create-donation-post", formData, {
            withCredentials: true,
          })
          .then((res) => {
            this.step = 4;
            setTimeout(() => {
              window.location.replace("/profil");
            }, 2500);
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
  margin: 1rem auto;
}

@media (max-width: 600px) {
  .image-preview {
    grid-template-columns: repeat(1, 1fr);
    margin: auto;
    width: 100%;
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


#delete-btn {
  padding: 2rem;
}

/* responsive media*/
@media (min-width: 200px) and (max-width: 550px) {
  .v-card {
    width: 90%;
  }
}
</style>
