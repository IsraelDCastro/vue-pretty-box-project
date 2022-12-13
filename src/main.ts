import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/vue-pretty-box.scss";
import "./assets/docs.scss";

const app = createApp(App);

app.use(router);

app.mount("#app");
