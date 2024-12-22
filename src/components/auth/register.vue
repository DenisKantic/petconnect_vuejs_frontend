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
      class="d-flex align-center flex-column justify-center"
      style="height: 100vh; background-color: white"
    >
      <span class="text-start text-h4 pb-5"
        >Registruj se</span
      >
      <br />

      <v-form ref="form" v-model="valid" lazy-validation style="width: 60%">
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
          :rules="[rules.required, rules.name]"
          required
          variant="outlined"
        ></v-text-field>

        <label>Šifra</label>
        <v-text-field
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

        {{ error_msg }}

        <div>
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

<script>
export default {
  data() {
    return {
      is_checked: false,
      password: "",
      confirm_password: "",
      is_loading: true,
      show_password: false,
      show_check_pass: false,
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

          if (value.length > 25) {
            return "Šifra ne može biti duža od 25 karaktera";
          }
          return true;
        },
        confirm_password: (value) => {
          return value === this.password || "Šifre se ne poklapaju";
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
    toggle_password() {
      this.show_password = !this.show_password;
    },
    toggle_check_pass() {
      this.show_check_pass = !this.show_check_pass;
    },
    submit() {
      this.error_msg = '';
      if (!this.$refs.form.validate()) {
        return "Molimo popunite sva polja";
      } else if (!this.is_checked) {
        this.error_msg = "Morate prihvatiti uslove korištenja";
        return;
      } else if(this.password === ""){
        this.error_msg = "Niste upisali šifru"
        return
      } else if (this.password !== this.confirm_password) {
        this.error_msg = "Šifre se ne poklapaju";
        return;
      } else if (this.email === "") {
        this.error_msg = "Niste upisali email adresu";
        return;
      } else if (this.name === "") {
        this.error_msg = "Niste upisali Vaše ime";
        return;
      }
      this.error_msg = "";

      alert("Form submitted successfully");
      this.$refs.form.reset()
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
.text-h4{
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

  .v-form {
    width: 90% !important;
  }

  .text-h4{
    width: 90% !important;
  }
}
</style>
