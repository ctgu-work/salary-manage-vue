import request from "@/utils/request.js";

/**
 * 获取岗位
 * @param params
 * @returns {AxiosPromise}
 */
export function findPositionType(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "position-type/list", //如果是绝对路径就不会在使用配置里的url
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
export function PositionTypedelete(params) {
  return request({
    url: "/position-type/del",
    method: "get",
    params: params,
  });
}


/**
 * 添加公式
 * @param  params 
 */
export function addfindPositionType(params) {
  return request({
    url: "position-type/add",
    method: "post",
    params: params
  });
}

/**
 * 更新岗位
 * @param  params 
 */
export function updatePositionType(params) {
    return request({
      url: '/position-type/update',
      method: 'post',
      params: params
    });
  }