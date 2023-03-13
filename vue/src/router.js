import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/prepare",
      name: "prepare",
      component: () => import("@/views/PrepareView.vue"),
    },
    {
      path: "/format",
      name: "format",
      component: () => import("@/views/FormatView.vue"),
    },
    {
      path: "/check",
      name: "check",
      component: () => import("@/views/CheckView.vue"),
    },
    {
      path: "/reuse",
      name: "reuse",
      component: () => import("@/views/ReuseView.vue"),
    },
  ],
});

export default router;
