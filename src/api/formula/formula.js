import request from "@/utils/request.js";

/**
 * 获取所有报表
 * @param params
 * @returns {AxiosPromise}
 */
export function getFormula(params) {
    return request({
        url: "/formula/getFormula",
        method: "get",
        params: params
    });
}