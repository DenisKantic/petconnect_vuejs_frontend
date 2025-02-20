<template>
  <v-card :disabled="passwordCardLoading" :loading="passwordCardLoading" class="px-5 py-5 mt-10" id="container" >
    <v-card-title class="px-0 pb-4 text-h5">Promijeni šifru</v-card-title>
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

    <v-btn color="primary" @click="submit_password" :loading="changePassBtnLoading">Promijeni</v-btn>
    </v-card>

    <v-card id="container" class="mt-10" color="error">
      <v-card-title class="d-flex items-center">Obriši profil
      </v-card-title>

      <v-card-text>Obrišite vaš profil u potpunosti sa svim oglasima i server podacima
        <br><span>PAŽNJA: Ovaj postupan je nepovratan!</span>
      </v-card-text>
      <v-dialog max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      class="ml-4 mb-4"
      v-bind="activatorProps"
      color="red"
      variant="flat"
    >
    Obriši profil
    <v-icon size="25" class="ml-2">mdi-alert</v-icon>
  </v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card  title="Obriši profil">
      <v-card-text>
        Da li ste sigurni da želite obrisati profil kao i sve podatke?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
        text="Obriši"
        color="error"
        variant="flat"
        ></v-btn>
        <v-btn
        color="primary"
          text="Odustani"
          variant="flat"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
     
    </v-card>
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.message }}</v-snackbar>
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
      show_password: false,
      show_check_pass: false,
      text: "",
      password: "",
      changePassBtnLoading: false,
      passwordCardLoading: false,
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
    showSnackbar(message, color) {
      this.snackbar.visible = true;
      this.snackbar.message = message;
      this.snackbar.color = color;
    },

    submit_password(){

      this.changePassBtnLoading = true;
      this.passwordCardLoading = true;
      if (this.password != this.confirm_password){
        this.showSnackbar("Šifre se ne poklapaju", "error")
        this.changePassBtnLoading = false;
        this.passwordCardLoading = false;
        return
      }

      const params = {
        password: this.password
      }

      this.$http.post('http://localhost:8080/change-password', params, {
        withCredentials: true
      })
      .then((response)=>{
        console.log("RESPONSE HERRE",response.data.success)
        this.showSnackbar(response.data.success, "success")
      })
      .catch((error)=>{
        this.showSnackbar(response.data.error, "error")
      })

      this.changePassBtnLoading = false
      this.passwordCardLoading = false;
    }
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
  .v-form {
    width: 60% !important;
  }

  .text-h4 {
    width: 90% !important;
  }

  #container {
    width: 80% !important;
    background-color: aqua;
    margin: auto;
  }
}

@media (min-width: 1025px){
  #container{
    width: 50%;
    margin: auto;
  }
}
</style>
