import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: "/adjust",
      name: "adjust",
      component: () => import("@/views/AdjustView.vue"),
    },
    {
      path: "/reuse",
      name: "reuse",
      component: () => import("@/views/ReuseView.vue"),
    },
    {
      path: "/:paths(.*)*",
      name: "nothing",
      redirect: "/",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
