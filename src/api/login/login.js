import request from "@/utils/request.js";

export function login(params) {
    return request({
        url: 'admin/login',
        method: 'post',
        params: params
    })
}