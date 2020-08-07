import request from "@/utils/request.js";

/**
 * 员工信息详情页
 * @param params
 * @returns {AxiosPromise}
 */
export function login(params) {
  return request({
    url: "/staff/staff_detail",
    method: "get",
    data: params //注意：如果是get请求请使用 params: params
  });
}
