import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/App.vue";
import BasicManage from "./basicManage";
import Salary from "./salary";
import staffDetail from "../views/BasicManage/Staff/StaffDetail"
import login from "../views/admin/Login"
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
  BasicManage,
  {
    //员工信息详情页
    path: "/staff/detail",
    name: "staffDetail",
    component: staffDetail
  },
  {
    // 新增页
    path: "/staff/add",
    name: "addStaff",
    component: login
  },
  {
    // 登录
    path: "/admin/login",
    name: "login",
    component: login
  },
  Salary,
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
});

export default router;
