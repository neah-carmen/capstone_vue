import Vue from "vue";
import VueRouter from "vue-router";
import EdiblesIndex from "../views/edibles/Index.vue";
import EdiblesNew from "../views/edibles/New.vue";
import EdiblesShow from "../views/edibles/Show.vue";
import AuthSignup from "../views/auth/Signup.vue";
import AuthLogin from "../views/auth/Login.vue";
import AuthLogout from "../views/auth/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/edibles/",
    name: "edibles-index",
    component: EdiblesIndex
  },
  {
    path: "/edibles/new",
    name: "edibles-new",
    component: EdiblesNew
  },
  {
    path: "/edibles/:id",
    name: "edibles-show",
    component: EdiblesShow
  },
  {
    path: "/auth/signup",
    name: "auth-signup",
    component: AuthSignup
  },
  {
    path: "/auth/Login",
    name: "auth-login",
    component: AuthLogin
  },
  {
    path: "/auth/Logout",
    name: "auth-logout",
    component: AuthLogout
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
