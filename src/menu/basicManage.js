export default {
  name: "基本信息管理",
  permissionsKey: "",
  icon: "fa fa-user",
  children: {
    courseCardList: {
      name: "员工信息管理",
      permissionsKey: "",
      path: "/info/staff",
      icon:'fa fa-group (alias)'
    },
    departCardList: {
      name: "部门管理",
      permissionsKey: "",
      path: "/info/depart"
    },
    staffCardList: {
      name: "岗位管理",
      permissionsKey: "",
      path: "/info/jobs"
    }
  }
};
