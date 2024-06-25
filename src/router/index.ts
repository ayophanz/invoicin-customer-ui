import { createRouter, createWebHistory } from "vue-router";
import middleware from "./middleware";
import Main from "../views/Main.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/customer",
      name: "Main",
      component: Main,
    },
  ],
});

router.beforeEach(middleware.beforeEach);

export default router;
