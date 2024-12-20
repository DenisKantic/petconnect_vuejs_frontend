<template>
  <!-- loading spinner-->
  <v-container
    v-if="is_loading"
    class="d-flex align-center justify-center flex-column"
    style="height: 100vh; background: none"
  >
    <v-progress-circular indeterminate color="primary" size="120" width="12">
    </v-progress-circular>
    <br />
    <span class="text-h5 text-center">Učitavanje...</span>
  </v-container>
  <div
    v-else
    id="container"
    style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh"
  >
    <v-container
      class="d-flex align-center justify-center flex-column"
      style="height: 100vh; background-color: white"
    >
      <span class="text-start text-h4">Prijavi se</span> <br />
      <v-form ref="form" v-model="valid" lazy-validation style="width: 60%">
        <label>Email</label>
        <v-text-field
          outlined
          class="input_field mb-2 mt-2"
          v-model="email"
          :rules="[rules.required, rules.email]"
          required
          variant="outlined"
        ></v-text-field>

        <label>Šifra</label>
        <v-text-field
          v-model="name"
          :rules="[rules.password]"
          required
          variant="outlined"
          class="mb-5 mt-2"
        ></v-text-field>

        <span class="text-decoration-underline text-subtitle-2"
          >Zaboravili ste lozinku?</span
        >

        <v-btn
          @click="submit"
          class="mb-4"
          style="
            width: 100%;
            height: 3rem;
            margin-top: 1rem;
            background-color: #2f5382;
            color: #ffffff;
          "
          >Prijavi se</v-btn
        >

        <span
          >Nemaš kreiran nalog?
          <span style="color: #2f5382; font-weight: bolder"
            >Kreiraj ovdje!</span
          ></span
        >
      </v-form>
    </v-container>
    <v-img
      src="@/assets/picture.svg"
      cover
      style="
        width: 100%;
        height: 100%;
        max-width: 100%;
        background-color: #2f5382;
      "
    >
    </v-img>
  </div>
</template>

<style scoped>
form {
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      is_loading: true,
      valid: false,
      name: "",
      email: "",
      message: "",
      rules: {
        required: (value) => !!value || "*Obavezno polje.",
        email: (value) =>
          /.+@.+\..+/.test(value) || "E-mail mora biti validan.",
        password: (value) => {
          if (value.length < 8) {
            return "Šifra mora imati minimalno 8 karaktera.";
          }
          return true;
        },
      },
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Handle form submission
        alert("Form submitted!");
      }
    },
  },

  mounted() {
    setTimeout(() => {
      this.is_loading = false;
    }, 700);
  },
};
</script>

<style scoped>
@media (max-width: 1024px) {
  #container {
    grid-template-columns: 1fr !important;
  }

  .v-form {
    width: 90% !important;
  }
}
</style>
