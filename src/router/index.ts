import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Chassis from "../views/Chassis.vue";
import ChassiSB from "../views/ChassiSB.vue";
import ChassiItems from "../views/ChassiItems.vue";
import Login from "../views/Login.vue";
import Items from "../views/Items.vue";
import ItemDetail from "../views/ItemDetail.vue";
import RegisterChassi from "../views/RegisterChassi.vue";
import PageNotFound from "../views/PageNotFound.vue";

// createWebHistory(import.meta.env.BASE_URL),

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { requiresAuth: false, redirectIfAuth: true },
  },
  {
    path: "/dashboard", 
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
    props: true,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
  {
    path: '/item/:id_item/:name_item',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
  {
    path: "/chassis",
    name: "chassis",
    component: Chassis,
    props: true,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
  {
    path: "/chassis/:chassi/sb",
    name: "chassi-sb",
    component: ChassiSB,
    props: true,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
  {
    path: "/chassis/:chassi/items",
    name: "chassi-items",
    component: ChassiItems,
    props: true,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
  {
    path: "/chassis/register",
    name: "register-chassi",
    component: RegisterChassi,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
    meta: { requiresAuth: true, redirectIfAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('authToken');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const redirectIfAuth = to.matched.some(record => record.meta.redirectIfAuth);

  if (requiresAuth && !token) {
    next({ name: "login" });
  } else if (redirectIfAuth && token) {
    next({ name: "chassis" });
  } else {
    next();
  }
});
  
export default router;
