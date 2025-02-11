<template>
  <v-app>
    <v-card>
      <v-card-title class="text-h6 font-weight-regular ">
        <span>{{ currentTitle }}</span>
        <v-avatar color="primary" size="24"></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field label="Title" placeholder="Enter a title for your ad"></v-text-field>
            <v-text-field label="Description" placeholder="Describe your ad"></v-text-field>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <VFileUpload
              class="upload"
              density="default"
              scrim="primary"
              clearable
              multiple
              title="Kliknite ovdje ili prenesite fotografije"
              label="Upload Images"
              prepend-outer-icon="mdi-file"
            />
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Ad Created Successfully!
            </h3>
            <span class="text-caption text-grey">Thanks for creating your ad!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          v-if="step > 1"
          variant="text"
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step < 3"
          color="primary"
          variant="flat"
          @click="step++"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { VFileUpload } from 'vuetify/labs/VFileUpload';

export default {
  components: {
    VFileUpload,
  },
  data() {
    return {
      step: 1,
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Create Ad';
        case 2:
          return 'Upload Images';
        default:
          return 'Ad Created';
      }
    },
  },
};
</script>

<style scoped>
.v-app{
  background-color: green !important;
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh !important;
}
.v-card{
  width: 50% !important;
  margin: auto;
}
</style>