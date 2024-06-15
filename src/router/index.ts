import { createRouter, createWebHistory } from "vue-router";
import middleware from "./middleware.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //
  ],
});

router.beforeEach(middleware.beforeEach);

export default router;
