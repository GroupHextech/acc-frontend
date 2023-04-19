import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Chassis from "../views/Chassis.vue";
import ChassiSB from '../views/ChassiSB.vue';
import ChassiItems from '../views/ChassiItems.vue';
import Login from "../views/Login.vue";
import Items from "../views/Items.vue";
import ItemDetail from "../views/ItemDetail.vue";
import RegisterChassi from "../views/RegisterChassi.vue";

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
  },
  {
    path: "/items/item?id=:id",
    name: "ItemDetail",
    component: ItemDetail,
    props: true,
  },
  {
    path: "/chassis",
    name: "chassis",
    component: Chassis,
    props: true,
  },
  {
    path: "/chassis/:chassi/sb",
    name: "chassi-sb",
    component: ChassiSB,
    props: true,
  },
  {
    path: "/chassis/:chassi/items",
    name: "chassi-items",
    component: ChassiItems,
    props: true,
  },
  {
    path: "/register/chassi",
    name: "register-chassi",
    component: RegisterChassi,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
