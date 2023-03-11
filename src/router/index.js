import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HouseDetailsView from "@/views/HouseDetailsView.vue";
import CreateEditHouseView from "@/views/CreateEditHouseView.vue";
import FavoriteListView from "@/views/FavoriteListView.vue";
import HouseView from "@/views/HouseListView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "",
        name: 'listHouse',
        component: HouseView,
      },
      {
        path: "create",
        name: 'createHouse',
        component: CreateEditHouseView,
      },
      {
        path: "update/:houseId",
        name: "updateHouse",
        component: CreateEditHouseView,
      },
      {
        path: "details/:houseId",
        name: "houseDetails",
        component: HouseDetailsView,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/favorite",
    name: "favoriteHouse",
    component: FavoriteListView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // linkActiveClass: ['active', 'active-child']
});

export default router;
