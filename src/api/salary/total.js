import request from "@/utils/request.js";

export function getSalary(params,id) {
    params.departId = id;
    return request({
        url: "/salary/getSalary",
        method: "get",
        params: params
    });
}

export function updateSalaryStatus(params) {
    // params.departId = id;
    return request({
        url: "/salary/updateSalaryStatus",
        method: "get",
        params: params
    });
}