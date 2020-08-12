import zhLocale from 'element-ui/lib/locale/lang/en'

const zh = {
    login: {
        username: '用户名',
        password: '密码',
        formtitle: '登录系统',
        subbtn: '登录',
        msg: {
            wronglogin: '用户名或密码错误',
            nullusername: '请输入用户名',
            nullpassword: '请输入密码',
            illegalpassword: '密码长度必须是6-10位'
        },
    },
    menu: {//左侧菜单栏
        homePage: '首页',
        basic: {
            basic: '基础信息管理',
            stuff: '员工信息管理',
            depart: '部门信息管理',
            job: '岗位管理',
        },
        salary: {
            fixed: '固定项目管理',
            atten: '导入项目管理',
            calculate: '计算项目管理',
            showcalculate:'员工工资展示',
            total: '总工资项目管理'
        }

    },
    basicManage: {//基础信息管理
        department: {//部门词汇
            departId: '部门编号',
            departName: '部门编号',
            departPhone: '部门电话',
            description: '部门描述',
            establishDate: '建立日期',
            fax: '部门传真',
            type: '部门类型',
            fatherDepartName: '父部门',

        },
        position: {//岗位词汇
            positionId: '岗位编号',
            positionName: '岗位名称',
            positionMan: '岗位编制',
            departName: '部门名字',
            type: '岗位类型',
        }
    },
    btn: {//按钮统一再次声明
        add: '添加',
        select: '查询',
        reset: '重置',
        edit: '编辑',
        delete: '删除',
        exportTable: '本地导出表格',
        input: '请输入参数',
        selectType: '请选择搜索类型',
        confirm: '确认',
        cancle: '取消'

    },
    msg: {//可统一消息再次声明
        null: '无',

    },
    ...zhLocale
}
export default zh