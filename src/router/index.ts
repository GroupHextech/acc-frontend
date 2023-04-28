import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Chassis from "../views/Chassis.vue";
import ChassiSB from '../views/ChassiSB.vue';
import ChassiItems from '../views/ChassiItems.vue';
import Login from "../views/Login.vue";
import Items from "../views/Items.vue";
import ItemDetail from "../views/ItemDetail.vue";
import RegisterChassi from "../views/RegisterChassi.vue";
import { useAuthStore } from "../store/auth";

// createWebHistory(import.meta.env.BASE_URL),

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/items/item?id=:id",
    name: "ItemDetail",
    component: ItemDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/chassis",
    name: "chassis",
    component: Chassis,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/chassis/:chassi/sb",
    name: "chassi-sb",
    component: ChassiSB,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/chassis/:chassi/items",
    name: "chassi-items",
    component: ChassiItems,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/chassis/register",
    name: "register-chassi",
    component: RegisterChassi,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Se a rota requer autenticação e o usuário não está autenticado, redirecione para a página de login
    next('/');
  } else {
    // Caso contrário, permita o acesso à rota
    next();
  }
});

export default router;
