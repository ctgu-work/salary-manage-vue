import Layout from "@/views/layout/App.vue";
export default {
  path: "/work_manage",
  component: Layout,
  name: "BasicManage",
  redirect: "/work_manage/list",
  meta: {
    title: "基础信息管理"
  },
  children: [
    {
      path: "list",
      name: "WorkManageList",
      meta: {
        title: "员工基本信息管理"
      },
      component: resolve =>
        require(["@/views/BasicManage/WorkerList/Index.vue"], resolve)
    }
  ]
};
