import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Global styles
import "@mdi/font/css/materialdesignicons.css"; // Material Design Icons
import axios from "axios";

// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";

const app = createApp(App);
const vuetify = createVuetify();
app.config.globalProperties.$http = axios; // defining axios globaly, this.$http.get/post/....

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
