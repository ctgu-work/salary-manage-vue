import enLocale from 'element-ui/lib/locale/lang/en'

const en = {
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