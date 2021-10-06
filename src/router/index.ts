import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/servers",
  },
  {
    path: "/servers",
    component: () => import("@/views/Chart.vue"),
  },
  {
    path: "/servers/:id",
    props: true,
    component: () => import("@/views/Servers.vue"),
    children: [
      {
        path: "console",
        component: () => import("@/components/Console.vue"),
        props: true,
      },
      {
        path: "settings",
        component: () => import("@/components/Settings.vue"),
        props: true,
      },
      {
        path: "",
        redirect: "console",
      },
    ],
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
