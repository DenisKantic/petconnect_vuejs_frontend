<template>
  <fieldset class="px-16 mt-10" id="container" style="width: 60%; margin: auto">
    <legend class="text-h5">Postavke profila</legend>
    <label>Nova šifra</label>
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

    <label>Potvrdite novu šifru</label>
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

    <v-btn color="primary">Promijeni</v-btn>

    <v-divider class="pb-4 mt-4"></v-divider>

    <p class="text-h6">Obriši korisnički profil</p>

    <v-btn color="red" class="mb-5">Obriši</v-btn>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      show_password: false,
      show_check_pass: false,
      text: "",
      password: "",
      confirm_password: "",
      rules: {
        required: (value) => !!value || "Obavezno polje",
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

#container {
  border: 1px solid black;
}

label {
  font-size: 1.2rem;
}
@media (max-width: 1024px) {
  .v-form {
    width: 90% !important;
  }

  .text-h4 {
    width: 90% !important;
  }

  #container {
    width: 90% !important;
  }
}
</style>
