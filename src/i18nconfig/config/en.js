import enLocale from 'element-ui/lib/locale/lang/en'

export const en = {
    login: {
        username: 'username',
        password: 'password',
        formtitle: 'Login System',
        subbtn: 'Login',
        msg: {
            wronglogin: 'Account password error',
            nullusername: 'Please input username',
            nullpassword: 'Please input password',
            illegalpassword: 'Password length is 6-10 digits'
        },
    },
    menu:{
        homePage: 'Home',
        basic: {
            basic: 'BasicMessage'
        },
    },
    basicManage: {
        department: {
            departId: 'Depart-Id',
            departName: 'Depart-Name',
            departPhone: 'Depart-Phone',
            description: 'Description',
            establishDate: 'Dstablish-Date',
            fax: 'Fax',
            type: 'Type',
            fatherDepartName: 'Father-DepartName',

        },
        position: {//岗位词汇
            positionId: 'Position-Id',
            positionName: 'Position-Name',
            positionMan: 'Position-Man',
            departName: 'Depart-Name',
            type: 'Type',
        },
    },
    Salary:{
        formula: {//岗位词汇
            formulaId: 'Formula-Id',
            formulaName: 'Formula-Name',
            formulaPercentage: 'Formula-Percentage',
        }
    },
    departType:{
        departmentType: {//岗位词汇
            departTypeId: 'department-Id',
            type: 'type',
        }
    },
    positionType:{
        poType: {//岗位词汇
            positionTypeId: 'positionType-Id',
            type: 'type',
        }
    },
    btn: {
        add: 'Add',
        select: 'Select',
        reset: 'Reset',
        edit: 'Edit',
        delete: 'Delete',
        exportTable: 'Export-Table',
        input: 'Please input search params',
        selectType: 'Please select search type',
        confirm: 'Confirm',
        cancle: 'Cancle'
    },
    msg: {
        null: 'Null',
    },
    ...enLocale
}
export default en