import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuth } from "./auth.ts";
import NProgress from "nprogress";
import "./assets/nprogress.css";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "budget-planner",
    children: [
      {
        path: "", 
        redirect: "/login",
      },
      {
        path: "dashboard",
        component: () => import("./components/BudgetDashboard.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("./components/login.vue"),
    meta: { noAuth: true },
  },
  {
    path: "/404",
    meta: { title: "Not Found", noAuth: true },
    component: () => import("./components/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("./components/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();

  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.meta.noAuth && token) {
    next("/dashboard");
  } else {
    next();
  }
});


router.afterEach(() => {
  NProgress.done();
});

export default router;
