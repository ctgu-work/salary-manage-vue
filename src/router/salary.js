import Layout from "@/views/layout/App.vue";
export default {
  path: "/salary",
  component: Layout,
  name: "Salary",
  redirect: "/salary/fix",
  meta: {
    title: "工资管理",
  },
  children: [
    {
      path: "fix",
      name: "fixedSalary",
      meta: {
        title: "固定工资管理",
      },
      component: (resolve) =>
        require(["@/views/Salary/fixedSalary/Index.vue"], resolve),
    },
    {
      path: "atten",
      name: "attendanceSalary",
      meta: {
        title: "导入项目管理",
      },
    //   component: (resolve) =>
    //     require(["@/views/BasicManage/Department/Index.vue"], resolve),
    },
    {
      path: "/calculate",
      name: "calculateSalary",
      meta: {
        title: "计算项目管理",
      },
    //   component: (resolve) =>
    //     require(["@/views/BasicManage/Jobs/Index.vue"], resolve),
    },
    {
      path: "/show",
      name: "calculateShow",
      meta: {
        title: "员工工资展示",
      },
    //   component: (resolve) =>
    //     require(["@/views/BasicManage/Jobs/Index.vue"], resolve),
    },
    {
        path: "total",
        name: "totalSalary",
        meta: {
          title: "总工资管理",
        },
        // component: (resolve) =>
        //   require(["@/views/BasicManage/Jobs/Index.vue"], resolve),
      }
  ],
};
