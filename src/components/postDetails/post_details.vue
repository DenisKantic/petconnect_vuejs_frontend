<template>
  <router-link to="/udomi"
    ><v-btn class="ml-16 mt-10" color="primary" variant="outlined"
      >Nazad <v-icon class="ml-2">mdi-arrow-left</v-icon></v-btn
    ></router-link
  >
  <v-container class="d-flex flex-column flex-lg-row">
    <div class="left-side">
      <p class="text-h4 pb-4">{{ new_data.pet_name }}</p>
      <v-carousel
        color="primary"
        height="400"
        show-arrows
        cycle
        hide-delimiter-background
      >
        <template v-if="is_loading">
          <v-carousel-item>
            <v-sheet height="100%">
              <v-row class="fill-height justify-center align-center">
                <v-progress-circular
                  size="100"
                  indeterminate
                  color="primary"
                  width="8"
                ></v-progress-circular>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </template>
        <v-carousel-item
          v-for="(image, index) in new_data?.images"
          :key="index"
          v-else
        >
          <v-sheet height="100%" class="d-flex items-center justify-center">
            <v-img
              :src="`http://localhost:8080/${image}`"
              @click="openDialog(image)"
              aspect-ratio="1"
            >
            </v-img>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <p class="text-center mt-5">
        Za pregled fotografija preko čitavog ekrana, kliknite na fotografiju
      </p>
    </div>
    <div class="right-side">
      <p class="text-h4 pb-4">Detalji ljubimca</p>
      <v-row>
        <v-col v-for="(card, index) in cards" :key="index" cols="12" md="6">
          <v-card class="mx-auto" :title="card.title" :subtitle="card.subtitle">
          </v-card>
        </v-col>
      </v-row>
      <p class="text-h6 py-4">Detaljan opis</p>

      <v-card class="mx-auto" link>
        <v-card-text>
          {{ subtitleCard }}
        </v-card-text>
      </v-card>

      <div class="d-flex flex-column flex-md-row" style="gap: 1rem">
        <v-btn
          color="primary"
          @click="openContactDialog"
          class="mt-6 flex-grow-1"
          variant="outlined"
          >Kontaktiraj me
          <v-icon class="ml-2" size="22">mdi-email</v-icon></v-btn
        >
        <v-btn
          color="primary"
          @click="shareOnFacebook"
          class="mt-6 flex-grow-1"
          variant="outlined"
          >Podijeli na facebook
          <v-icon class="ml-2" size="22">mdi-facebook</v-icon></v-btn
        >
      </div>
    </div>

    <!-- Fullscreen dialog for images -->
    <v-dialog v-model="dialog" hide-overlay>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" color="red" variant="flat" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-carousel
          color="primary"
          height="80vh"
          show-arrows
          cycle
          hide-delimiter-background
        >
          <v-carousel-item
            v-for="(img, index) in new_data?.images"
            :key="index"
          >
            <v-sheet height="80vh" class="d-flex items-center justify-center">
              <v-img
                :src="`http://localhost:8080/${img}`"
                aspect-ratio="1"
                contain
                max-height="100%"
                max-width="100%"
              ></v-img>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>

    <!-- Dialog for Contact -->
    <v-dialog class="contact_dialog" v-model="contact_dialog">
      <v-card :loading="isMsgLoading" :disabled="isMsgLoading">
        <v-card-title class="text-center">
          <span class="headline">Kontaktiraj vlasnika</span>
        </v-card-title>
        <v-card-text class="text-justify">
          Zbog zaštite privatnosti podataka, kontakt informacije vlasnika oglasa
          je <span class="font-weight-bold">skriveno!</span>
          Ovdje unesite vašu poruku koja će biti proslijeđena vlasniku oglasa na
          njegov email.
        </v-card-text>
        <v-card-text>
          <v-textarea
            v-model="message"
            :rules="rules"
            counter
            label="Vaša poruka"
            rows="8"
            no-resize
            outlined
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="isMsgLoading"  @click="sendMessage(new_data.pet_name, new_data.user_email)" color="primary" variant="outlined"
            >Pošalji</v-btn
          >
          <v-btn @click="contact_dialog = false, message = ''" color="red" variant="flat"
            >Odustani</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog if user is not logged in for contact -->
    <v-dialog class="contact_dialog" v-model="not_logged_contact_dialog">
      <v-card>
        <v-card-title class="text-center">
          <span class="headline">Upozorenje!</span>
        </v-card-title>
        <v-card-text class="text-justify">
          Zbog zaštite privatnosti podataka, kontakt informacije vlasnika oglasa
          je <span class="font-weight-bold">skriveno!</span>
          Da bi mogli poslati upit vlasniku oglasa, morate imati registrovan
          korisnički profil.
        </v-card-text>
        <v-card-text class="d-flex flex-column items-center text-h6">
          <p class="text-center">Registrujte se ovdje</p>
          <br />
          <router-link class="mx-auto" to="/registracija"
            ><v-btn color="primary">Registracija</v-btn></router-link
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="not_logged_contact_dialog = false"
            color="red"
            variant="flat"
            >Odustani</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export default {
  data() {
    return {
      is_user_loggedIn: useAuthStore(),
      post: null,
      message: "",
      is_loading: true,
      isMsgLoading: false,
      contact_dialog: false,
      not_logged_contact_dialog: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      new_data: [],
      rules: [(v) => v.length <= 1500 || "Maksimalno 1500 karaktera"],
      dialog: false,
      subtitleCard:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publish. rem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publish",
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      cards: [
        { title: "Naziv ljubimca", subtitle: "N/A" },
        { title: "Lokacija", subtitle: "N/A" },
        { title: "Vrsta životinje", subtitle: "N/A" },
        { title: "Spol", subtitle: "N/A" },
        { title: "Vakcinisan", subtitle: "N/A" },
        { title: "Datum objave", subtitle: "N/A" },
        { title: "Čipovan", subtitle: "N/A" },
      ],
    };
  },
  methods: {
    shareOnFacebook() {
      const postID = this.$route.params.id;

      if (postID === "") {
        window.location.replace("/");
      }

      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=http://petconnectbosnia.com/udomi/${postID}`;
      window.open(shareUrl, "_blank");
    },
    async sendMessage(post_name, owner_email) {
      const postURL = window.location.href

      this.isMsgLoading = true;
      const param_object = {
        message: this.message,
        subject: post_name,
        email: owner_email,
        post_url: postURL
      }
      await axios.post('http://localhost:8080/send-message', param_object, {withCredentials: true})
      .then((response) =>{
          console.log(response)
          setTimeout(()=>{
            this.isMsgLoading = false;
            this.contact_dialog = false;
          }, 2000)

      })
      .catch((error)=>{
        console.log("ERROR", error)
        this.isMsgLoading = true;
      })
    },
    async fetch_post() {
      const postID = this.$route.params.id;

      if (postID === "") {
        window.location.replace("/");
      }

      await axios(`http://localhost:8080/one-adopt-post/${postID}`)
        .then((response) => {
          this.new_data = response.data[0];
          this.is_loading = false;
          console.log("RESP",response)

          for (const key in this.new_data) {
            if (typeof this.new_data[key] === "boolean") {
              this.new_data[key] = this.new_data[key] ? "Da" : "Ne";
            }
          }

          this.cards = [
            {
              title: "Naziv ljubimca",
              subtitle:
                this.new_data.pet_name.charAt(0).toUpperCase() +
                this.new_data.pet_name.slice(1),
            },
            { title: "Lokacija", subtitle: this.new_data.location },
            {
              title: "Vrsta životinje",
              subtitle: this.format_animal_category(this.new_data.category),
            },
            { title: "Spol", subtitle: this.format_gender_string(this.new_data.sex) },
            { title: "Vakcinisan", subtitle: this.new_data.vaccinated },
            { title: "Čipovan", subtitle: this.new_data.chipped },
            {
              title: "Datum objave",
              subtitle: this.format_date(this.new_data.created_at) || "N/A",
            },
          ];

          this.subtitleCard = this.new_data.description;

        })
        .catch((error) => {
          console.log("error");
          this.is_loading = false;
        });
      this.is_loading = false;
    },

    format_gender_string(gender){
      if(gender === "muzjak"){
        return "Mužjak"
      } else {
        return "Ženka"
      }
    },
    format_animal_category(animal){
      if(animal === "pas"){
        return "Pas"
      } else if (animal === "macka"){
        return "Mačka"
      } else {
        return "Ostalo"
      }
    },
    format_date(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice();

      return `${day}/${month}/${year}`;
    },
    openDialog() {
      this.dialog = true;
    },
    openContactDialog() {
      if (this.is_user_loggedIn.isAuthenticated === false) {
        this.not_logged_contact_dialog = true;
      } else {
        this.contact_dialog = true;
      }
    },
  },
  mounted() {
    this.fetch_post();
  },
};
</script>

<style scoped>
.v-container {
  min-height: 40vh;
}

.left-side {
  width: 50%;
  padding: 2rem;
}

.right-side {
  width: 50%;
  padding: 2rem;
}

.description {
  padding: 2rem;
}

@media (min-width: 250px) and (max-width: 1500px) {
  .left-side,
  .right-side {
    width: 100%;
  }
}

@media (min-width: 250px) and (max-width: 700px) {
  .contact_dialog {
    width: 95%;
  }
}

@media (min-width: 701px) and (max-width: 1200px) {
  .contact_dialog {
    width: 70%;
  }
}

@media (min-width: 1201px) {
  .contact_dialog {
    width: 50%;
  }
}
</style>
