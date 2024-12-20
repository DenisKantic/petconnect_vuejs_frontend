import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Global styles
import "@mdi/font/css/materialdesignicons.css"; // Material Design Icons

// Composables
import { createApp } from "vue";

const app = createApp(App);
const vuetify = createVuetify();

app.use(router);
app.use(vuetify);
app.mount("#app");
