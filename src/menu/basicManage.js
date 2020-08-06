export default {
  name: "基本信息管理",
  permissionsKey: "",
  icon: "fa fa-envelope-open",
  children: {
    courseCardList: {
      name: "员工信息管理",
      permissionsKey: "",
      path: "/work_manage/list"
    },
    departCardList: {
      name: "部门管理",
      permissionsKey: "",
      path: "/depart_manage/list"
    },
    staffCardList: {
      name: "岗位管理",
      permissionsKey: "",
      path: "/staff_manage/list"
    }
  }
};
