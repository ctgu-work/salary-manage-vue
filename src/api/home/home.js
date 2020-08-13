import request from "@/utils/request.js";

/**
 * 获取员工、部门、岗位数
 * @param params
 * @returns {AxiosPromise}
 */
export function getNum(params) {
  return request({
    url: "/index/num",
    method: "get",
    params: params //注意：如果是get请求请使用 params: params
  });
}

/**
 * 获取各部门迟到总天数
 * @param params
 * @returns {AxiosPromise}
 */
export function getLateDay(params) {
    return request({
      url: "/index/late",
      method: "get",
      params: params //注意：如果是get请求请使用 params: params
    });
  }