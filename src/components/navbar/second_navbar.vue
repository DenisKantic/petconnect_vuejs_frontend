<template>
  <v-app-bar app color="#1D3A5F" dark class="px-16">
    <div class="d-flex items-center justify-end" style="width: 100%">
      <v-btn><v-icon>mdi-paw</v-icon>Udomi životinju</v-btn>
      <v-btn><v-icon>mdi-magnify</v-icon>Izgubljene životinje</v-btn>
      <v-btn><v-icon>mdi-hand-coin</v-icon>Donacijski oglasi</v-btn>
      <v-btn
        ><v-icon color="red">mdi-alert</v-icon
        ><span style="color: red; font-weight: bolder; margin-right: 0.3rem"
          >SOS
        </span>
        oglasi</v-btn
      >
    </div>
  </v-app-bar>
</template>

<style scoped>
.v-icon {
  padding-right: 1rem;
}

.v-btn:hover {
  color: aqua;
}
</style>
