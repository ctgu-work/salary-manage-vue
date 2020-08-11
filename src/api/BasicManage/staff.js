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
        params: {"staffId": params} //注意：如果是get请求请使用 params: params
    });
}
/**
 * 搜索框搜索
 * @param  params
 * @param  page
 */
export function findStaffByParams(params, page) {
    var url = "";
    if (params.type === "staffName") {
        url = "staff/find-name";
        params.staffName = params.title;
    } else {
        url = "staff/find-id";
        params.staffId = params.title;
    }
    params.startPage = page.startPage;
    params.pageSize = page.pageSize;
    return request({
        url: url,
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
export function addStaff(params) {
    console.log(params);
    return request({
        url: "/staff/add",
        method: "get",
        data: params //注意：如果是get请求请使用 params: params
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