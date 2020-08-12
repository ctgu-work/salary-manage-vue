import Layout from "@/views/layout/App.vue";
export default {
  path: "/info",
  component: Layout,
  name: "BasicManage",
  redirect: "/info/staff",
  meta: {
    title: "基础信息管理",
  },
  children: [
    {
      path: "staff",
      name: "StaffManage",
      meta: {
        title: "员工基本信息管理",
      },
      component: (resolve) =>
        require(["@/views/BasicManage/Staff/Index.vue"], resolve),
    },
    {
      path: "depart",
      name: "DepartManage",
      meta: {
        title: "部门信息管理",
      },
      component: (resolve) =>
        require(["@/views/BasicManage/Department/Index.vue"], resolve),
    },
    {
      path: "jobs",
      name: "JobsManage",
      meta: {
        title: "部门信息管理",
      },
      component: (resolve) =>
        require(["@/views/BasicManage/Jobs/Index.vue"], resolve),
    },
  ],
};
