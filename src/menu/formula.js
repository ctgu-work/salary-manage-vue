export default {
    name: "报表管理",
    permissionsKey: "",
    icon: "fa fa-database",
    children: {
        staffFormula: {
            name: "员工工资报表",
            permissionsKey: "",
            path: "/formula/staff",
        },
        deptFormula: {
            name: "部门工资报表",
            permissionsKey: "",
            path: "/formula/dept",
        },
        firmFormula: {
            name: "公司工资报表",
            permissionsKey: "",
            path: "/formula/firm",
        }
    }
};