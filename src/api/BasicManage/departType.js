import request from "@/utils/request.js";

/**
 * 获取岗位
 * @param params
 * @returns {AxiosPromise}
 */
export function findDepartmentType(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "depart-type/list", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}


// /**
//  * 搜索框搜索
//  * @param  params
//  * @param  page
//  */
// export function findCaculateByParams(params, page) {
//     params.formulaName = params.title;
//   params.startPage = page.startPage;
//   params.pageSize = page.pageSize;
//   return request({
//     url: '/formula/getFormula',
//     method: "get",
//     params: params,
//   });
// }


/**
 * 删除
 * @param  params
 * @param  page
 */
export function DepartmentTypedelete(params) {
  return request({
    url: "/depart-type/del",
    method: "get",
    params: params,
  });
}


/**
 * 添加公式
 * @param  params 
 */
export function addfindDepartmentType(params) {
  return request({
    url: "depart-type/add",
    method: "post",
    params: params
  });
}

/**
 * 更新岗位
 * @param  params 
 */
export function updateDepartmentType(params) {
    return request({
      url: '/depart-type/update',
      method: 'post',
      params: params
    });
  }