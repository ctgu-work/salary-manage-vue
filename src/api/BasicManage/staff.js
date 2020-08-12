import request from "@/utils/request.js";

/**
 * 获取所有员工
 * @param params
 * @returns {AxiosPromise}
 */
export function findStaff(params) {
    return request({
        url: "/staff/list",
        method: "get",
        params: {
            "staffId": params
        } //注意：如果是get请求请使用 params: params
    });
}
/**
 * 搜索框搜索,根据idCard
 * @param  params
 * @param  page
 */
export function findStaffByParams(params, page) {
    params.idCard = params.title;
    params.startPage = page.startPage;
    params.pageSize = page.pageSize;
    return request({
        url: "staff/find-idCard",
        method: "get",
        params: params,
    });
}
// /**
//  * 员工详情
//  * @param params
//  */
// export function findStaffDetail(params, row) {
//     params.staffId = row.staffId;
//     return request({
//         url: "/staff/detail",
//         method: "get",
//         data: params //注意：如果是get请求请使用 params: params
//     });
// }
/**
 * 新增员工
 * @param params 
 */
export function addStaff(data) {
    console.log(data);
    return request({
        url: "/staff/add",
        method: "post",
        data: data //注意：如果是get请求请使用 params: params
    });
}
/**
 * 删除员工
 * @param params 
 */
export function delStaff(params) {
    return request({
        url: "/staff/del",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}

/**
 * 更新员工
 * @param {form} params 
 */
export function updateOneStaff(params) {
    return request({
        url: 'staff/update',
        method: 'post',
        data: params
    })
}

/**
 * 根据部门查岗位
 * @param params 
 */
export function departAllPosition(params) {
    return request({
        url: 'staff/position-list',
        method: 'get',
        params: params
    })
}