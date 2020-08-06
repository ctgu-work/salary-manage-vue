import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/App.vue";
import BasicManage from "./basicManage";
import Login from "../views/login/Login"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    name: "Dashboard",
    redirect: "/home",
    meta: {
      title: "仪表盘"
    },
    children: [
      {
        path: "home",
        name: "DashboardHome",
        meta: {
          title: "首页"
        },
        component: resolve => require(["@/views/home/Index.vue"], resolve)
      }
    ]
  },
<<<<<<< HEAD
  BasicManage,
=======
  // ArticleManage,
  // {
  //   path: "/login",
  //   name: "Login",
  //   meta: {
  //     title: "后台登录",
  //     keepAlive: false
  //   },
  //   components: {
  //     blank: resolve => require(["@/views/login/Login.vue"], resolve)
  //   }
  // },
>>>>>>> b5103c99584042d2084c691cee4439fea4071a62
  {
    // 登录页
    path: "/login",
    name: "Login",
    component: Login
  }
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
});

export default router;
