import { createApp } from "vue";
// import { MotionPlugin } from "motion-v";
import App from "./App.vue";
import router from "./router";

import "./assets/vue-pretty-box.css";
import "./assets/docs.css";

const app = createApp(App);

// app.use(MotionPlugin);
app.use(router);

app.mount("#app");
