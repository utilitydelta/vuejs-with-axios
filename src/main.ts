import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import RequestHandler from "@/components/RequestHandler";

Vue.config.productionTip = false;

// @ts-ignore
import VueProgressBar from "vue-progressbar";

Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  failedColor: "red",
  height: "2px",
});

const vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

const axiosInstance = axios.create();

Vue.prototype.$RequestHandler = new RequestHandler(
  router,
  axiosInstance,
  // @ts-ignore
  vue.$Progress
);
