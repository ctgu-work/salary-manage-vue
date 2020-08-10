/**
 * 用户
 * @param params
 * @returns {AxiosPromise}
 */
export function workers(params) {
    return request({
      // closeLoading: true,
      // closeInterceptors: true,
      url: "/worker/list",
      method: "get",
      params: params //注意：如果是get请求请使用 params: params
    });
  }
  export function detail(params) {
    return request({
  
      url: "/worker/add_worker",
      method: "get",
      data: params //注意：如果是get请求请使用 params: params
    });
  }