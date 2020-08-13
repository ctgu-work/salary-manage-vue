import request from "@/utils/request.js";

/**
 * 获取所有固定工资
 * @param params
 * @returns {AxiosPromise}
 */
export function findFixedSalary(params) {
    return request({
        url: "/fixedSalary/list",
        method: "get",
        params: params
    });
}

/**
 * 更新固定工资
 * @param data 
 */
export function updateOneFixedSalary(data) {
    return request({
        url: 'FixedSalary/update',
        method: 'post',
        data: data
    })
}

/**
 * 根据部门id查固定工资
 * @param params 
 */
export function getByDepartId(params) {
    return request({
        url: 'fixedSalary/getByDepartId',
        method: 'get',
        params: params
    })
}

/**
 * 根据部门id,员工id查固定工资
 * @param params 
 */
export function getFixedSalaryByParams(params, page, departId) {
    var url = "";
    if (params.title2 == "") {
        url = 'fixedSalary/getByDepartIdAndStaffId'
        params.staffId = params.title;
    } else {
        params.left = params.title;
        params.right = params.title2;
        url = 'fixedSalary/getByDepartIdAndSection'
    }
    params.departId = departId;
    params.startPage = page.startPage;
    params.pageSize = page.pageSize;
    return request({
        url: url,
        method: 'get',
        params: params
    })
}

/**
 * 修改工资
 * @param params 
 */
export function updateFixedSalary(params, departId) {
    params.departId = departId;
    return request({
        url: 'fixedSalary/updateByDepartId',
        method: 'get',
        params: params
    })
}