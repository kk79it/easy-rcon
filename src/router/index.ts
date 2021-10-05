import { register } from "@/controller";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Start",
    component: () => import("@/views/Start.vue"),
  },
  {
    path: "/server/:id",
    name: "Server",
    component: () => import("@/views/Server.vue"),
  },
  {
    path: "/servers",
    component: () => import("@/views/Servers.vue"),
    children: [
      {
        path: "",
        component: () => import("@/components/Chart.vue"),
      },
    ],
  },
  {
    path: "/servers/:id",
    name: "Servers",
    props: true,
    component: () => import("@/views/Servers.vue"),
    children: [
      {
        path: "console",
        component: () => import("@/components/Console.vue"),
      },
      {
        path: "settings",
        component: () => import("@/components/Settings.vue"),
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
