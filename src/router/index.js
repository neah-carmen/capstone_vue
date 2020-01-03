import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import EdiblesIndex from "../views/edibles/Index.vue";
import EdiblesShow from "../views/edibles/Show.vue";
import UsersCreate from "../views/users/Show.vue";

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
  },
  {
    path: "/edibles/:id",
    name: "edibles-show",
    component: EdiblesShow
  },
  {
    path: "/users/",
    name: "users-create",
    component: UsersCreate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
