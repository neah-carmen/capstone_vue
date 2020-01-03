import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import EdiblesIndex from "../views/edibles/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/edibles/",
    name: "edibles-index",
    component: EdiblesIndex
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
