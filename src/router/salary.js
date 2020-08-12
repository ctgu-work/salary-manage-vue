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
          require(["@/views/BasicManage/WorkerList/Index.vue"], resolve),
    },
    {
      path: "atten",
      name: "attendanceSalary",
      meta: {
        title: "导入项目管理",
      },
      component: (resolve) =>
        require(["@/views/Salary/AttenSalary/Index.vue"], resolve),
    },
    {
      path: "calculate",
      name: "calculateSalary",
      meta: {
        title: "计算项目管理",
      },
        // component: (resolve) =>
        //   require(["@/views/BasicManage/Jobs/Index.vue"], resolve),
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
