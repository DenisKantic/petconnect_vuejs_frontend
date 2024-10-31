<template>
    <div style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh">
        
        <v-container class="d-flex align-center justify-center" style="height: 100vh; background-color: white">
        <v-form ref="form" v-model="valid" lazy-validation style="width: 50%">

            <v-text-field
            outlined
            class="input_field"
        v-model="email"
        :rules="[rules.required, rules.email]"
        required
        label="email"
                variant="outlined"
      ></v-text-field>


      <v-text-field
        v-model="name"
        label="Name"
        :rules="[rules.required]"
        required
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="name"
        label="Password"
        :rules="[rules.required]"
        required
                variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="name"
        label="Confirm Password"
        :rules="[rules.required]"
        required
                variant="outlined"
      ></v-text-field>

      <v-btn @click="submit" style="width: 100%; height:3rem; margin-top:1rem; background-color: lightblue" outlined>Registruj se</v-btn>

      <div>Already have an account? Login here</div>
    </v-form>
        </v-container>
        <v-img
            src="@/assets/picture.svg"
            cover
            style="width:100%; height:100%; max-width:100%; background-color:lightblue">
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
      valid: false,
      name: '',
      email: '',
      message: '',
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Handle form submission
        alert('Form submitted!');
      }
    },
  },
};
</script>