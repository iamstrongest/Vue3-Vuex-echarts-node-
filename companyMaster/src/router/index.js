import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/components/Layout.vue"),
    redirect: "/layout",
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/layout",
    name: "layout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/components/Layout.vue"),
    redirect: "/layout/userslist",
    children: [
      {
        path: "userslist",
        name: "userslist",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/UsersList.vue"),
      },
      {
        path: "map",
        name: "map",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Map.vue"),
      },
    ],
  },
  {
    path: "/layout/userlist/:id",
    name: "empInfo",
    component: () => import("@/components/EmpInfo.vue"),
  },
];

const router = createRouter({
  // 历史模式此处设置为 hash模式
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // 如果跳转目标不是/login
  if (to.path !== "/login") {
    // 并且存在本地记录，则放行
    if (localStorage.getItem("token")) {
      next();
    } else {
      //如果不存在本地记录，则强制跳转到登录界面
      next("/login");
    }
  } else {
    // 如果是跳转目标是/login,需要放行
    next();
  }
});
export default router;
