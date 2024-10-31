<template>
        <v-app-bar
          color="primary"
          prominent
        >
          <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>
  
          <v-toolbar-title><RouterLink to="/">Home</RouterLink></v-toolbar-title>
  
          <v-spacer></v-spacer>
  
          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>
  
            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>
  
          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>
  
  </template>