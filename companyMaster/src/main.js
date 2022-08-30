import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import Fenye from "./Fenye.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
// const app = createApp(Fenye);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.use(ElementPlus).mount("#app");
app.use(store).use(router).use(ElementPlus).mount("#app");
