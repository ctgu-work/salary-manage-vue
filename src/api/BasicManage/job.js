import request from "@/utils/request.js";

/**
 * 获取部门
 * @param params
 * @returns {AxiosPromise}
 */
export function findJob
(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "position/list", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}
