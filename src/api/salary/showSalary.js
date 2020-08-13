import request from "@/utils/request.js";

/**
 * 获取所有固定工资
 * @param params
 * @returns {AxiosPromise}
 */
export function findShowCalculate(params) {
    return request({
        url: "/calcSalary/getByStaffNameOrCalcItemName",
        method: "get",
        params: params
    });
}

/**
 * 搜索框搜索
 * @param  params
 * @param  page
 */
export function findSalaryByParams(params, page) {
    if (params.type === "name") {
        params.staffName = params.title;
      } else {
        params.calcItemName = params.title;
      }
    params.startPage = page.startPage;
    params.pageSize = page.pageSize;
    return request({
      url: "/calcSalary/getByStaffNameOrCalcItemName",
      method: "get",
      params: params,
    });
  }


/**
 * 删除
 * @param  params
 * @param  page
 */
export function calculateShowDelete(params) {
    return request({
      url: "/calcSalary/deleteCalcSalary",
      method: "get",
      params: params,
    });
  }

