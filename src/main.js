import { createApp } from "vue";
import * as VueRouter from "vue-router";
import * as Vuex from "vuex";
import App from "./App.vue";
import Login from "./routes/Login.vue";
import Signup from "./routes/Signup.vue";
import Users from "./routes/Users.vue";
import Post from "./routes/Post.vue";
import Option from "./routes/Option.vue";
import User from "./routes/User.vue";

const routes = [
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: {
      auth: false,
    },
  },
  {
    path: "/signup",
    component: Signup,
    name: "signup",
    meta: {
      auth: false,
    },
  },
  {
    path: "/users",
    component: Users,
    name: "users",
    meta: {
      auth: true,
    },
  },
  {
    path: "/users/:userId",
    component: User,
    name: "user",
    meta: {
      auth: true,
    },
  },
  {
    path: "/",
    component: Post,
    name: "posts",
    meta: {
      auth: true,
    },
  },
  {
    path: "/options",
    component: Option,
    name: "options",
    meta: {
      auth: true,
    },
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
  linkActiveClass: "redirect",
  isAuthenticated: true,
});

const store = Vuex.createStore({
  state() {
    return {
      saveToken: JSON.parse(localStorage.getItem("saveToken")),
      connectedUser: JSON.parse(localStorage.getItem("connectedUser")),
    };
  },
  mutations: {
    SET_SAVE_TOKEN: (state, value) => {
      state.saveToken = value;
      localStorage.setItem("saveToken", JSON.stringify(value));
    },
    SET_CONNECTED_USER(state, value) {
      state.connectedUser = value;
      localStorage.setItem("connectedUser",JSON.stringify(value))
    },
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.getItem("saveToken"))
    return next({ name: "login" });
  if(!to.meta.auth && localStorage.getItem("saveToken"))
  return next({ name: "posts" });
  return next();
});

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
