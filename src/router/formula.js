import Layout from "@/views/layout/App.vue";
export default {
    path: "/formula",
    component: Layout,
    name: "Formula",
    redirect: "/formula/staff",
    meta: {
        title: "报表管理",
    },
    children: [{
            path: "staff",
            name: "staffFormula",
            meta: {
                title: "员工工资报表",
            },
            component: (resolve) =>
                require(["@/views/Formula/staffFormula/Index.vue"], resolve),
        },
        {
            path: "dept",
            name: "deptFormula",
            meta: {
                title: "部门工资报表",
            },
            component: (resolve) =>
                require(["@/views/Formula/deptFormula/Index.vue"], resolve),
        },
        {
            path: "firm",
            name: "firmFormula",
            meta: {
                title: "公司工资报表",
            },
            component: (resolve) =>
                require(["@/views/Formula/firmFormula/Index.vue"], resolve),
        },
    ],
};