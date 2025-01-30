import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuth } from './auth.ts';
import NProgress from 'nprogress';
import './assets/nprogress.css';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/budget-planner/dashboard',
    component: () => import('./components/BudgetDashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/budget-planner/login',
    component: () => import('./components/Login.vue'),
    meta: { noAuth: true },
  },
  {
    path: '/',
    redirect: '/budget-planner/login',
  },
  {
    path: '/404',
    meta: { title: 'Not Found', noAuth: true },
    component: () => import('./components/404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const { token } = useAuth();

  if (to.meta.requiresAuth && !token.value) {
    next('/budget-planner/login');
  } else if (to.meta.noAuth && token.value) {
    next('/budget-planner/dashboard');
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
