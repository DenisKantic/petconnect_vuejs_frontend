<template>
  <v-container class="mt-6 d-flex flex-column flex-md-row">
    <div class="left-side">
      <p class="text-h4 pb-4">Detalji oglasa</p>
      <v-carousel height="400" show-arrows cycle hide-delimiter-background>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">{{ slide }} Slide</div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="right-side">
      <p class="text-h4 pb-4">Detalji ljubimca</p>
      <v-row>
        <v-col v-for="(card, index) in cards" :key="index" cols="12" md="6">
          <v-card
            class="mx-auto"
            :title="card.title"
            :subtitle="card.subtitle"
            link
          >
          </v-card>
        </v-col>
      </v-row>
      <p class="text-h6 py-4">Detaljan opis</p>

      <v-card class="mx-auto" link>
        <v-card-text>
          {{ subtitleCard }}
        </v-card-text>
      </v-card>
      <v-btn color="primary" class="mt-6" width="50%" variant="outlined"
        >Kontaktiraj me</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      subtitleCard:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publish. rem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publish",
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      cards: [
        { title: "Naziv ljubimca", subtitle: "Simba" },
        { title: "Lokacija", subtitle: "Sarajevo" },
        { title: "Vrsta zivotinje", subtitle: "Pas" },
        { title: "Starost", subtitle: "Stariji" },
        { title: "Spol", subtitle: "Musko" },
        { title: "Vakcinisan", subtitle: "Ne" },
        { title: "Pasos", subtitle: "Da" },
        { title: "Cipovan", subtitle: "Ne" },
      ],
    };
  },
  methods: {
    async testPost() {
      const postID = this.$route.params.id;
      console.log("POST ID", postID);
    },
  },
  mounted() {
    this.testPost();
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

@media (max-width: 980px) {
  .left-side,
  .right-side {
    width: 100%;
  }
}
</style>
