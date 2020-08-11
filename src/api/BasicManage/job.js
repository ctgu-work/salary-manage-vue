import request from "@/utils/request.js";

/**
 * 获取岗位
 * @param params
 * @returns {AxiosPromise}
 */
export function findJob(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "position/list", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}


/**
 * 搜索框搜索
 * @param  params
 * @param  page
 */
export function findJobByParams(params, page) {
  var url = "";
  if (params.type === "name") {
    url = "position/find-name";
    params.positionName = params.title;
  } else {
    url = "position/find-type";
    params.type = params.title;
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
 * 删除
 * @param  params
 * @param  page
 */
export function positiondelete(params) {
  return request({
    url: "/position/del",
    method: "get",
    params: params,
  });
}


/**
 * 获取所有岗位类型
 * @param  params
 */
export function findJobType(params) {
  return request({
    url: "/position/type-list",
    method: "get",
    params: params,
  });
}


/**
 * 添加岗位
 * @param  params 
 */
export function addJob(params) {
  return request({
    url: "position/add",
    method: "post",
    data: params
  });
}


/**
 * 更新岗位
 * @param  params 
 */
export function updateOneJob(params) {
  return request({
    url: '/position/update',
    method: 'post',
    data: params
  });
}
  /**
 * 获取部门名字
 * @param  params 
 */
export function findDepartName(params) {
  return request({
    url: '/position//name-list',
    method: 'get',
    params: params
  })
}


