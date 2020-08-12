import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/App.vue";
import BasicManage from "./basicManage";
import Login from "../views/login/Login"
import Staff_detail from "../views/staff/Staff_detail"
import AddWorker from "../views/BasicManage/WorkerList/addWorker"
import Salary from "./salary"
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
  Salary,
  {
    //员工信息详情页
    path: "/staff_detail",
    name: "Staff_detail",
    component: Staff_detail
  },
  {
    // 登录页
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    // 新增页
    path: "/addWorker",
    name: "AddWork",
    component: AddWorker
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
});

export default router;
