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
import { useAuthStore } from "../store/auth";

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

const authStore = useAuthStore();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const redirectIfAuth = to.matched.some(record => record.meta.redirectIfAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
  } else if (redirectIfAuth && authStore.isAuthenticated) {
    next({ name: "chassis" });
  } else {
    next();
  }
});


// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   const token = authStore.token;
//   const isAuthenticated = authStore.isAuthenticated;

//   if (to.meta.requiresAuth && !isAuthenticated && !token) {
//     // NOT AUTHENTICATED --> Redirect to login page
//     next("/");
//     console.log("isAuthenticated "+ isAuthenticated)
//   } else if (to.name === "login" && token) {
//     // AUTHENTICATED --> Trying to access the login page
//     next("/chassis");
//     console.log("Indo pra tela de chassis")
//   } else {
//     // AUTHENTICATED --> Access to any another route
//     next();
//     console.log("Autenticado")
//   }
// });
  
export default router;
