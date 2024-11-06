<template>
  <div class="login-container">
    <v-container
      class="d-flex align-center justify-center login-form-container"
      style="height: 100vh; background-color: white"
    >
      <v-form ref="form" v-model="valid" lazy-validation class="login-form">
        <v-img src="@/assets/logo.svg" height="60"></v-img>
        <div class="text-h4 py-4 text-center">Prijavi se</div>
        <v-text-field
          outlined
          class="input_field"
          v-model="email"
          :rules="[rules.required, rules.email]"
          required
          label="Email"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="name"
          label="Password"
          :rules="[rules.required]"
          required
          variant="outlined"
          class="mt-2"
        ></v-text-field>

        <div class="text-subtitle-2 text-decoration-underline" style="color: #506e95">
          Forgot your password?
        </div>

        <v-btn
          @click="submit"
          style="
            width: 100%;
            height: 3rem;
            margin-top: 0.5rem;
            background-color: #2f5382;
            color: white;
          "
          outlined
        >
          Login
        </v-btn>

        <div class="pt-5">
          Don't have an account?
          <span class="text-decoration-underline" style="color: #506e95"
            >Create here</span
          >
        </div>

        <RouterLink style="margin-top: 2rem" to="/">Go back to the home page</RouterLink>
      </v-form>
    </v-container>

    <!-- Right side image, hidden on mobile -->
    <v-img class="login-image" src="@/assets/picture.svg" cover></v-img>
  </div>
</template>

<style scoped>
/* Base styles for layout */
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  width: 100%;
}

.login-form-container {
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 100%;
  max-width: 400px; /* Limit the form width */
}

/* Hide the image on mobile and center the form */
.login-image {
  display: block;
  width: 100%;
  height: 100%;
  background-color: lightblue;
}

/* Responsive styles */
@media (max-width: 1024px) {
  /* Laptop and larger - show form and image side by side */
  .login-container {
    grid-template-columns: 1fr 1fr;
  }
  .login-image {
    display: block;
  }
}

@media (max-width: 768px) {
  /* Mobile and smaller devices - hide the image and center the form */
  .login-container {
    grid-template-columns: 1fr;
  }
  .login-image {
    display: none;
  }
  .login-form {
    max-width: 90%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      valid: false,
      name: "",
      email: "",
      message: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
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
};
</script>
