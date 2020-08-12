export default {
    name: "工资管理",
    permissionsKey: "",
    icon: "fa fa-credit-card",
    children: {
      fixedSalary: {
        name: "固定工资管理",
        permissionsKey: "",
        path: "/salary/fix",
      },
      attendanceSalary: {
        name: "导入项目管理",
        permissionsKey: "",
        path: "/salary/atten"
      },
      calculateSalary: {
        name: "计算项目管理",
        permissionsKey: "",
        path: "/salary/calculate"
        },
      showSalary: {
        name: "员工工资展示",
        permissionsKey: "",
        path: "/salary/show"
      },
      totalSalary:{
          name:"总工资管理",
          permissionsKey: "",
          path: "/salary/total"
      }
    }
  };
  