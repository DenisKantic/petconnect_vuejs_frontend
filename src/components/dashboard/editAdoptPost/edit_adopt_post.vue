<template>
  <MainNavbar />
  <v-app id="container">
    <v-card :disabled="isCardDisabled">
      <v-stepper alt-labels v-show="step !== 3">
        <v-stepper-header>
          <v-stepper-item :value="!step === 1 ? 1 : 1" :complete="step >= 2">
            <template v-slot:title
              ><span class="d-none d-sm-block">Informacije</span>
            </template>
          </v-stepper-item>

          <v-divider></v-divider>


          <v-stepper-item :value="!step === 2 ? 2 : 2" :complete="step >= 3">
            <template v-slot:title>
              <span class="d-none d-sm-block">Pregled objave</span>
            </template>
          </v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item :value="!step === 3 ? 3 : 3" :complete="step === 3">
            <template v-slot:title>
              <span class="d-none d-sm-block">Objava</span>
            </template>
          </v-stepper-item>
        </v-stepper-header>
      </v-stepper>

      <v-window v-model="step">
        <v-window-item :value="1">
          <h3 class="text-h6 text-center font-weight-light my-4">
            Pregled informacija
          </h3>
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


        <v-window-item style="width: 100%" :value="2">
          <h3 class="text-h6 text-center font-weight-light my-4">
            Pregled oglasa prije objave!
          </h3>
          <div class="text-start pa-4 font-weight-light">
            <p class="pb-2 font-weight-bold">
              Ime životinje: <br />
              <span class="font-weight-light">{{ petName }}</span>
            </p>
            <p class="pb-2 font-weight-bold">
              Vrsta životinje: <br />
              <span class="font-weight-light">{{ animalCategory }}</span>
            </p>
            <p class="pb-2 font-weight-bold">
              Spol: <br />
              <span class="font-weight-light">{{ animalGender }}</span>
            </p>
            <p class="pb-2 font-weight-bold">
              Da li je životinja vakcinisana: <br />
              <span class="font-weight-light">{{ vaccinated }}</span>
            </p>
            <p class="pb-2 font-weight-bold">
              Da li je životinja čipovana: <br />
              <span class="font-weight-light">{{ chipped }}</span>
            </p>
            <p class="pb-2 font-weight-bold">
              Lokacija: <br />
              <span class="font-weight-light">{{ location }}</span>
            </p>
          </div>
        </v-window-item>

        <v-window-item id="third-container" :value="3"> </v-window-item>
      </v-window>

      <v-card-actions v-show="step != 3">
        <v-btn
          :disabled="isNazadBtnDisabled"
          v-if="step >= 1 && step < 3"
          variant="outlined"
          color="primary"
          @click="prevStep"
        >
          Nazad
        </v-btn>
        <v-btn to="/profil" color="red" variant="outlined">Odustani</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step === 2"
          :loading="isBtnLoading"
          :disabled="isBtnDisabled"
          @click="submitForm"
          color="primary"
          variant="flat"
          >Uredi objavu</v-btn
        >
        <v-btn v-if="step < 2" color="primary" variant="flat" @click="nextStep">
          Dalje
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-sheet
      :value="3"
      v-show="step === 3"
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

        Ukoliko Vas ne prebaci,
        <router-link to="/profil">kliknite ovdje</router-link>
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
import MainNavbar from "@/components/navbar/main_navbar.vue";

export default {
  components: {
    MainNavbar,
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
      step: 1,
      new_data: [],
      isCardDisabled: false,
      isBtnDisabled: false,
      isBtnLoading: false,
      isNazadBtnDisabled: false,
    };
  },
  methods: {

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
      } else if (this.step === 3) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
    async fetch_post() {
      const postID = this.$route.params.id;
      console.log("PARAM", postID);

      if (postID === "") {
        window.location.replace("/");
      }

      await this.$http
        .get(`${this.apiUrl}/one-adopt-post/${postID}`)
        .then(async (response) => {
          this.new_data = response.data[0];
          console.log("RESPONSE", response.data);

          for (const key in this.new_data) {
            if (typeof this.new_data[key] === "boolean") {
              this.new_data[key] = this.new_data[key] ? "da" : "ne";
            }
          }
          console.log("RESPONSE", this.new_data);

          this.petName = this.new_data.pet_name || "";
          this.animalCategory = this.new_data.category || "";
          this.description = this.new_data.description || "";
          this.animalGender = this.new_data.sex || "";
          this.vaccinated = this.new_data.vaccinated || "";
          this.chipped = this.new_data.chipped || "";
          this.location = this.new_data.location || "";

          this.subtitleCard = this.new_data.description;

          this.is_loading = false;
        })
        .catch((error) => {
          console.log("error", error);
          this.is_loading = false;
        });
      this.is_loading = false;
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

      this.$http
        .post(`${this.apiUrl}/create-adopt-post`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          this.step = 3;
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
    },
  },
  mounted() {
    this.fetch_post();
  },
};
</script>

<style scoped>

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
