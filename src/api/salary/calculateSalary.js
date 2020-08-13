import request from "@/utils/request.js";

/**
 * 获取岗位
 * @param params
 * @returns {AxiosPromise}
 */
export function findCaculate(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "formula/getFormula", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}


/**
 * 搜索框搜索
 * @param  params
 * @param  page
 */
export function findCaculateByParams(params, page) {
    params.formulaName = params.title;
  params.startPage = page.startPage;
  params.pageSize = page.pageSize;
  return request({
    url: '/formula/getFormula',
    method: "get",
    params: params,
  });
}


/**
 * 删除
 * @param  params
 * @param  page
 */
export function calculatedelete(params) {
  return request({
    url: "/formula/deleteFormula",
    method: "get",
    params: params,
  });
}


/**
 * 添加公式
 * @param  params 
 */
export function addCalculate(params) {
  return request({
    url: "formula/addFormula",
    method: "post",
    data: params
  });
}

/**
 * 更新公式
 * @param  params 
 */
export function updateOneCalculate(params) {
    return request({
      url: '/formula/updateFormula',
      method: 'post',
      data: params
    });
  }
