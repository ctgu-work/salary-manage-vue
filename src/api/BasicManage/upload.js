import request from "@/utils/request.js";


/**
 * 上传图片
 * @param params
 * @returns {AxiosPromise}
 */
export function uplode(params) {
    return request({
     
      url: "/staff/avatar", //如果是绝对路径就不会在使用配置里的url
      method: "post",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: params, //注意：如果是post请求请使用 data: params
    });
  }