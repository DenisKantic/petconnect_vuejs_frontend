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

          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                color="surface-variant"
                text="Zaboravili ste šifru?"
                variant="text"
                class="px-0 text-none"
              ></v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card
                :loading="is_card_loading"
                :disabled="is_card_disabled"
                style="min-height: 20vh"
                title="Resetuj šifru"
              >
                <v-card-text class="text-justify text-subtitle-2"
                  >Da bi se generisala nova šifra, molimo vas da upišete ispod
                  vašu email adresu, s kojom ste kreirali vaš korisnički nalog.
                  Nova šifra će biti poslana na vašu email adresu.</v-card-text
                >
                <v-text-field
                  outlined
                  label="Email"
                  placeholder="Upišite vaš email"
                  class="px-4"
                  v-model="reset_email"
                  :rules="computed_reset_email_rules"
                  required
                  variant="outlined"
                  @blur="validate_reset_email"
                ></v-text-field>
                <p
                  v-show="reset_email_error"
                  class="pb-2 text-red font-weight-bold text-center"
                >
                  Korisnički nalog ne postoji.
                </p>
                <p
                  v-show="reset_email_okay"
                  class="pb-4 px-4 text-green font-weight-regular text-center"
                >
                  Nova šifra je kreirana. Provjerite svoju email adresu
                </p>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="primary"
                    variant="elevated"
                    @click="submit_password_reset"
                  >
                    Reset
                  </v-btn>
                  <v-btn
                    text="Zatvori"
                    variant="outlined"
                    color="error"
                    class="mr-2"
                    @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

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
import main_navbar from "../navbar/main_navbar.vue";
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
      email_reset_touched: false,
      reset_email: "",
      passwordTouched: false, // Flag to track if password field has been touched
      message: "",
      is_card_disabled: false,
      is_card_loading: false,
      reset_email_error: false,
      reset_email_okay: false,
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
        reset_email: (value) =>
          /.+@.+\..+/.test(value) || "E-mail mora biti validan.",
      },
    };
  },
  computed: {
    computedEmailRules() {
      return this.emailTouched ? [this.rules.required, this.rules.email] : [];
    },
    computedPasswordRules() {
      return this.passwordTouched
        ? [this.rules.required, this.rules.password]
        : [];
    },
    computed_reset_email_rules() {
      return this.email_reset_touched
        ? [this.rules.required, this.rules.reset_email]
        : [];
    },
  },
  methods: {
    validateEmail() {
      this.emailTouched = true; // Mark the email field as touched
    },
    validatePassword() {
      this.passwordTouched = true; // Mark the password field as touched
    },
    validate_reset_email() {
      this.email_reset_touched = true;
    },
    toggle_password() {
      this.show_password = !this.show_password;
    },

    showSnackbar(message, color) {
      this.snackbar.visible = true;
      this.snackbar.message = message;
      this.snackbar.color = color;
    },
    submit_password_reset() {
      this.is_card_disabled = true;
      this.is_card_loading = true;

      const form_object = {
        email: this.reset_email,
      };

      this.$http
        .post("http://localhost:8080/password-reset", form_object)
        .then((response) => {
          this.showSnackbar("Nova šifra kreirana", "success");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("ERROR", error);
          this.showSnackbar(error.response.data.error, "error");
          this.is_card_disabled = false;
          this.is_card_loading = false;
        })
        .finally(() => {
          this.is_card_disabled = false;
          this.is_card_loading = false;
        });
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
        .post("http://localhost:8080/login", form_object, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/profil");
          this.showSnackbar("Prijava uspješna", "success");
          this.isActive.value = false;
          return;
        })
        .catch((error) => {
          console.log("error", error.response.data);
          this.showSnackbar(error.response.data, "error");
          return;
        });
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
