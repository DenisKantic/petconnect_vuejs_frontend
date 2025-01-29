<template>
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
        class="d-flex align-center flex-column justify-center"
        style="height: 100vh; background-color: white"
      >
        <span id="title" class="text-start text-h4 py-5">Registruj se</span>
        <br />

        <v-form ref="form" v-model="valid" lazy-validation style="width: 60%">
          <label>Email</label>
          <v-text-field
            :disabled="is_submiting"
            outlined
            class="input_field my-2"
            v-model="email"
            :rules="[rules.required, rules.email]"
            required
            variant="outlined"
          ></v-text-field>

          <label>Korisničko ime</label>
          <v-text-field
            :disabled="is_submiting"
            class="my-2"
            v-model="username"
            :rules="[rules.required, rules.username]"
            required
            variant="outlined"
          ></v-text-field>

          <label>Šifra</label>
          <v-text-field
            :disabled="is_submiting"
            class="my-2"
            maxlength="25"
            v-model="password"
            :rules="[rules.required, rules.password]"
            required
            appearance="outlined"
            :type="show_password ? 'text' : 'password'"
            variant="outlined"
            ><v-icon id="eye-icon" @click="toggle_password">{{
              show_password ? "mdi-eye" : "mdi-eye-off"
            }}</v-icon>
          </v-text-field>

          <label>Potvrdite šifru</label>
          <v-text-field
            :disabled="is_submiting"
            class="my-2"
            maxlength="25"
            :type="show_check_pass ? 'text' : 'password'"
            v-model="confirm_password"
            :rules="[rules.required, rules.confirm_password]"
            required
            appearance="outlined"
            variant="outlined"
            ><v-icon id="eye-icon" @click="toggle_check_pass">{{
              show_check_pass ? "mdi-eye" : "mdi-eye-off"
            }}</v-icon></v-text-field
          >

          <v-checkbox
            :disabled="is_submiting"
            v-model="is_checked"
            @click="!this.is_checked"
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
            :disabled="is_submiting"
            @click="submit"
            style="
              width: 100%;
              height: 3rem;
              color: white;
              font-size: 1.2rem;
              margin-top: 1rem;
              margin-bottom: 1.2rem;
              background-color: #2f5382;
            "
            outlined
            >Registruj se</v-btn
          >

          <div class="link-text">
            Imate već korisnički profil?
            <router-link to="/prijava">
              <span
                class="text-primary text-body-1 font-weight-bold cursor-pointer hover:text-primary hover:underline"
              >
                Prijavite se ovdje
              </span>
            </router-link>
          </div>
        </v-form>
      </v-container>
      <v-img
        src="@/assets/picture.svg"
        cover
        class="right-image"
        style="width: 100%; height: 100vh; background-color: lightblue"
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
        timeout: 3000, // Duration in milliseconds
        color: "success", // The color of the snackbar (success, error, etc.)
      },
      is_checked: false,
      is_submiting: false,
      password: "",
      confirm_password: "",
      is_loading: true,
      show_password: false,
      show_check_pass: false,
      valid: false,
      username: "",
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
          if (value.length > 25) {
            return "Šifra ne može biti duža od 25 karaktera";
          }
          return true;
        },
        confirm_password: (value) => {
          return value === this.password || "Šifre se ne poklapaju";
        },
        username: (value) => {
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
    toggle_password() {
      this.show_password = !this.show_password;
    },
    toggle_check_pass() {
      this.show_check_pass = !this.show_check_pass;
    },
    showSnackbar(message, color) {
      this.snackbar.visible = true;
      this.snackbar.message = message;
      this.snackbar.color = color;
    },
    submit() {
      this.is_submiting = true;

      const form_object = {
        username: this.username,
        email: this.email,
        password: this.password,
        is_valid: this.is_checked,
      };

      this.$http
        .post("http://localhost:8080/register", form_object)
        .then((response) => {
          console.log("success", response.data);
          this.$router.push("/profil");
          this.showSnackbar("Registracija uspješna", "success");
        })
        .catch((error) => {
          this.showSnackbar("Desila se greška", "error");
          console.error("ERROR", error);
          this.error_msg = "";
          this.$refs.form.reset();
        });

      this.$refs.form.reset();
      this.is_submiting = false;
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
#eye-icon {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}

.v-text-field {
  width: 100%;
  position: relative;
}

label {
  font-size: 1.2rem;
}
@media (max-width: 1024px) {
  #container {
    grid-template-columns: 1fr !important;
  }

  .v-container {
    margin-top: 5rem;
    min-height: 150vh auto !important;
  }

  #title {
    text-align: center !important;
  }

  .link-text {
    text-align: center !important;
    word-break: keep-all;
  }

  .right-image {
    display: none !important;
  }

  .v-form {
    width: 90% !important;
  }

  .text-h4 {
    width: 90% !important;
  }
}
</style>
