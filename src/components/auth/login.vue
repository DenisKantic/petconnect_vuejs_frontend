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
          v-model="password"
          :rules="[rules.password]"
          required
          :type="show_password ? 'text' : 'password'"
          variant="outlined"
          class="mb-5 mt-2"
        ><v-icon id="eye-icon" @click="toggle_password">{{
            show_password ? "mdi-eye" : "mdi-eye-off"
          }}</v-icon></v-text-field>

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

        {{ error_msg }} <br>

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
</template>


<script>

export default {
  data() {
    return {
      is_loading: true,
      valid: false,
      name: "",
      email: "",
      error_msg: "",
      password: "",
      show_password: false,
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
    toggle_password() {
      this.show_password = !this.show_password;
    },
    submit() {
      this.error_msg = '';
      if (!this.$refs.form.validate()) {
        return "Molimo popunite sva polja"
      }
      if(this.password === ""){
        this.error_msg = "Niste upisali šifru"
        console.log("SIFRA ERROR")
        return
      } 
      this.error_msg = "";
      alert("form submited")
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
.text-h4 {
  width: 60%;
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
