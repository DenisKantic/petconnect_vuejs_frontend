<template>
  <v-container>
    <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
    >
      <v-progress-circular
        v-if="loading"
        color="primary"
        size="100"
        width="10"
        class="mt-4"
        indeterminate
      ></v-progress-circular>

      <v-icon
        v-else
        v-show="!isFailed"
        class="mb-5"
        color="success"
        icon="mdi-check-circle"
        size="112"
      ></v-icon>

      <v-icon
        v-if="isFailed"
        class="mb-5"
        color="red"
        icon="mdi-alert"
        size="112"
      ></v-icon>

      <h2 v-show="isFailed" class="text-h5 mb-6 mt-4">
        Aktivacija neuspješna...
      </h2>
      <h2 v-if="loading" class="text-h5 mb-6 mt-4">Aktiviranje u toku...</h2>
      <h2 v-show="!isFailed" v-else class="text-h5 mb-6 mt-4">
        Uspješno ste aktivirali Vaš profil
      </h2>

      <p
        v-show="!isFailed"
        :hidden="loading"
        class="mb-4 text-medium-emphasis text-body-2"
      >
        Automatska redirekcija na prijavu...

        <br />

        Ukoliko Vas ne prebaci,
        <router-link to="/prijava">kliknite ovdje</router-link>
      </p>
    </v-sheet>

    <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
      <template #action>
        <v-btn color="white" text @click="snackbar.visible = false"
          >Zatvori</v-btn
        >
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "@/router";
import { useRoute } from "vue-router";

const loading = ref(true);
const isFailed = ref(false);

const snackbar = ref({
  visible: false,
  message: "",
  timeout: 2000,
  color: "success",
});

const showSnackbar = (message, color) => {
  snackbar.value.visible = true;
  snackbar.value.message = message;
  snackbar.value.color = color;
};

const activateProfile = async () => {
  const route = useRoute();
  const token = route.query.token;

  if (!token) {
    console.log("NEMA TOKENA");
    showSnackbar("Desila se greška", "error");
    loading.value = false;
    isFailed.value = true;
    return;
  }
  try {
    loading.value = true;

    const response = await axios.get(
      `http://localhost:8080/activate-account?token=${token}`,
    );

    setTimeout(() => {
      if (response.status === 200) {
        console.log("USPJESNO");
        showSnackbar("Profil aktiviran", "success");
        loading.value = false;
        router.push("/prijava");
      }
    }, 3000);
  } catch (error) {
    console.log("error");
    setTimeout(() => {
      router.push("/");
    }, 3000);
    loading.value = false;
    isFailed.value = true;
  }
};

onMounted(() => {
  activateProfile();
});
</script>
