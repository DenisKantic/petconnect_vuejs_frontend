<template>
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
      class="d-flex align-center justify-center"
      style="height: 100vh; background-color: white"
    >
      <v-form ref="form" v-model="valid" lazy-validation style="width: 50%">
        <label>Email</label>
        <v-text-field
          outlined
          class="input_field my-2"
          v-model="email"
          :rules="[rules.required, rules.email]"
          required
          variant="outlined"
        ></v-text-field>

        <label>Korisničko ime</label>
        <v-text-field
          class="my-2"
          v-model="name"
          :rules="[rules.name]"
          required
          variant="outlined"
        ></v-text-field>

        <label>Šifra</label>
        <v-text-field
          :append-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
          class="my-2"
          v-model="password"
          :rules="[rules.required, rules.password]"
          required
          type="password"
          variant="outlined"
        ></v-text-field>

        <label>Potvrdite Vašu šifru</label>
        <v-text-field
          class="my-2"
          type="password"
          v-model="confirm_password"
          :rules="[rules.required, rules.confirm_password]"
          required
          variant="outlined"
        ></v-text-field>

        <v-checkbox
          v-model="is_checked"
          label="Slažem se sa"
          class="d-flex align-center"
        >
          <template v-slot:label>
            <span>Slažem se sa</span>
            <a href="/uslovi-koristenja" target="_blank" class="ml-1"
              >uslovima korištenja</a
            >
          </template>
        </v-checkbox>

        <v-btn
          @click="submit"
          style="
            width: 100%;
            height: 3rem;
            margin-top: 1rem;
            background-color: lightblue;
          "
          outlined
          >Registruj se</v-btn
        >

        {{ error_msg }}

        <div>Already have an account? Login here</div>
      </v-form>
    </v-container>
    <v-img
      src="@/assets/picture.svg"
      cover
      style="
        width: 100%;
        height: 100%;
        max-width: 100%;
        background-color: lightblue;
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
      is_checked: false,
      is_loading: true,
      valid: false,
      error_msg: "",
      name: "",
      email: "",
      message: "",
      rules: {
        required: (value) => !!value || "*Obavezno polje.",
        email: (value) =>
          /.+@.+\..+/.test(value) || "E-mail mora biti validan.",
        password: (value) => {
          if (value.length < 8) {
            return "Šifra mora imati minimalno 8 karaktera";
          }
          return true;
        },
        confirm_password: (value) => {
          value === this.password || "Šifre se ne poklapaju";
        },
        name: (value) => {
          if (value.length < 3) {
            return "Ime ne može biti kraće od 3 karaktera";
          }

          if (value.length > 20) {
            return "Ime ne može biti duže od 20 karaktera";
          }
        },
      },
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.is_checked) {
          alert("Form submitted!");
        } else {
          this.error_msg = "Morate prihvatiti uslove korištenja";
        }
      } else {
        this.error_msg = "Molimo popunite sva obavezna polja.";
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
