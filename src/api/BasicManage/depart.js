import request from "@/utils/request.js";
// import qs from 'QS'

/**
 * 获取所有部门
 * @param params
 * @returns {AxiosPromise}
 */
export function findDepartment(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "depart/list", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params, //注意：如果是post请求请使用 data: params
  });
}

/**
 * 搜索框搜索
 * @param  params
 * @param  page
 */
export function findDepartmentByParams(params, page) {
  var url = "";
  if (params.type === "name") {
    url = "depart/find-name";
    params.departName = params.title;
  } else {
    url = "depart/find-id";
    params.id = params.title;
  }
  params.startPage = page.startPage;
  params.pageSize = page.pageSize;
  return request({
    url: url,
    method: "get",
    params: params,
  });
}

/**
 * 获取所有的部门类型
 * @param  params
 */
export function findDepartType(params) {
  return request({
    url: "depart-type/list",
    method: "get",
    params: params,
  });
}

/**
 * 添加部门
 * @param  params 
 */
export function addDepart(params) {
  return request({
    url: "depart/add",
    method: "post",
    data: params
  });
}


/**
 * 更新部门
 * @param {form} params 
 */
export function updateOneDepartment(params) {
  return request({
    url: 'depart/update',
    method: 'post',
    data: params
  })
}

/**
 * 删除部门
 * @param {id} params 
 */
export function delDepartById(params) {
  return request({
    url: 'depart/del',
    method: 'get',
    params: params
  })
}
