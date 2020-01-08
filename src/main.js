import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL =
  // connect to Rails
  // process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
  // connect to Express
  process.env.NODE_ENV === "development" ? "http://localhost:8081" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
