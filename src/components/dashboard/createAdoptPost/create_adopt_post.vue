<template>
  <v-app id="container">
    <v-card :disabled="isCardDisabled">
   

      <v-window v-model="step">
       
        <v-window-item :value="1">
          <p class="text-h6 text-center font-weight-light my-4">Kreiraj oglas za udomljavanje</p>
          <v-card-title class="text-h6 pt-5 font-weight-regular">
        <span>{{ currentTitle }}</span>
      </v-card-title>
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
          <p class="text-h6 text-center font-weight-light my-4">Unesite fotografije</p>
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
            <br />

            <v-btn
              :loading="isBtnLoading"
              :disabled="isBtnDisabled"
              @click="submitForm"
              color="primary"
              variant="flat"
              >OBJAVI</v-btn
            >
          </div>
        </v-window-item>

        <v-window-item id="fourth-container" :value="4">
          <v-icon size="40" color="green">mdi-check-circle-outline</v-icon>
          <p>Objava je uspješno kreirana</p>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions v-show="step !=4">
        <v-btn
          :disabled="isNazadBtnDisabled"
          v-if="step >= 1 && step < 4"
          variant="text"
          @click="prevStep"
        >
          Nazad
        </v-btn>
        <v-spacer></v-spacer>
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
import { ref } from "vue";

export default {
  components: {
    VFileUpload,
  },
  data() {
    const step = ref(1);

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
      } else if (this.step === 3){
        window.scrollTo({top: 0, behavior: "smooth"})
      } else if (this.step === 4){
        window.scrollTo({top: 0, behavior: "smooth"})
      }
    },

    handleFileUpload(files) {
      this.uploadedImages = files;
    },
    submitForm() {
      const formData = new FormData();
      this.isCardDisabled = true;
      this.isBtnDisabled = true;
      this.isBtnLoading = true;
      this.isNazadBtnDisabled = true;

      console.log(
        "DATA",
        "location",
        this.location,
        this.petName,
        "\n",
        "animal category",
        this.animalCategory,
        "\n",
        "animal gender",
        this.animalGender,
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

      setTimeout(()=>{
      this.$http
        .post("http://localhost:8080/create-adopt-post", formData, {
          withCredentials: true,
        })
        .then((res) => {
          this.step=4;
          console.log(res.data);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
      this.isCardDisabled = false;
      this.isBtnDisabled = false;
      this.isBtnLoading = false;
      this.isNazadBtnDisabled = false;
    },1500)}
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


#fourth-container{
  width: 100%;
  padding: 2rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#fourth-container .v-icon{
  padding: 2rem;
  display: flex;
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
