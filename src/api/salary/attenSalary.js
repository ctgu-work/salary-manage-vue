import request from "@/utils/request.js";

export function importData(params) {
    return request({
        url: 'rewardPunish/addRewardPunish',
        method: 'post',
        data: params
    })
}

export function getTable(params) {
    return request({
        url: 'rewardPunish/getRewardPunish',
        method: 'post',
        params: params
    })
}

export function findItemsByParams(params, page) {
    console.log(params);
    let res = {}
    if (params.type === 'date') {
        res.startTime = parseTime(params.title[0])
        res.endTime = parseTime(params.title[1])
    } else if (params.type === 'id') {
        res.staffId = params.title;
    } else {
        res.departId = params.title;
    }
    res.startPage = page.startPage
    res.pageSize = page.pageSize
    return request({
        url: 'rewardPunish/getRewardPunish',
        method: 'post',
        params: res
    })
}

function parseTime(d) {
    const newDate =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    return newDate;
}