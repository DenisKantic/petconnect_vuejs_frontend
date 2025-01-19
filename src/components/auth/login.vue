<template>
  <!-- loading spinner-->
  <v-app>
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      <div class="d-flex justify-space-between align-center">
        <span style="font-size: 1.2rem">{{ snackbar.message }}</span>
        <v-btn icon @click="snackbar.visible = false" class="ml-2">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-snackbar>
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
            :rules="computedEmailRules"
            required
            variant="outlined"
            @blur="validateEmail"
          ></v-text-field>

          <label>Šifra</label>
          <v-text-field
            v-model="password"
            :rules="computedPasswordRules"
            required
            :type="show_password ? 'text' : 'password'"
            variant="outlined"
            class="mb-1 mt-2"
            @blur="validatePassword"
            ><v-icon id="eye-icon" @click="toggle_password">{{
              show_password ? "mdi-eye" : "mdi-eye-off"
            }}</v-icon></v-text-field
          >

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
            outlined
            >Prijavi se</v-btn
          >

          <span
            >Nemaš kreiran nalog?
            <router-link to="/registracija">
              <span style="color: #2f5382; font-weight: bolder"
                >Kreiraj ovdje!</span
              >
            </router-link></span
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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      snackbar: {
        visible: false,
        message: "",
        timeout: 3000,
        color: "success",
      },
      is_loading: true,
      valid: false,
      name: "",
      email: "",
      password: "",
      show_password: false,
      emailTouched: false, // Flag to track if email field has been touched
      passwordTouched: false, // Flag to track if password field has been touched
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
  computed: {
    computedEmailRules() {
      return this.emailTouched ? [this.rules.required, this.rules.email] : [];
    },
    computedPasswordRules() {
      return this.passwordTouched ? [this.rules.required, this.rules.password] : [];
    },
  },
  methods: {
    validateEmail() {
      this.emailTouched = true; // Mark the email field as touched
    },
    validatePassword() {
      this.passwordTouched = true; // Mark the password field as touched
    },
    toggle_password() {
      this.show_password = !this.show_password;
    },
    showSnackbar(message, color) {
      this.snackbar.visible = true;
      this.snackbar.message = message;
      this.snackbar.color = color;
    },
    submit() {
      if (this.password == "" || this.email == "") {
        this.showSnackbar("Niste popunili sva polja!", "error");
        return;
      }
      const form_object = {
        email: this.email,
        password: this.password,
      };

      this.$http
        .post("http://localhost:8080/login", form_object)
        .then((response) => {
          this.$router.push("/profil");
          this.showSnackbar("Prijava uspješna", "success");
          return;
        })
        .catch((error) => {
          this.showSnackbar("Desila se greška", "error");
          this.$refs.form.reset();
          return;
        });
      this.$refs.form.reset();
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
.text-h4 {
  width: 60%;
}

html {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#eye-icon {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}
@media (max-width: 1024px) {
  #container {
    grid-template-columns: 1fr !important;
  }

  .v-form {
    width: 90% !important;
  }

  .text-h4 {
    width: 90% !important;
  }
}
</style>
