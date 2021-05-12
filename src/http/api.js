import {get, post } from './axios'

const loginApi = '/login/'
const indexShowApi = '/index_show/'
const textNextApi = '/text_next/'
const replyNextApi = '/reply_next/'
const titleDetailApi = '/article_comment/'
const textSortApi = '/text_sort/'
export const apiLogin = (data) => {
    return new Promise((resolve, reject) => {
        post(loginApi, data).then(
            res => resolve(res),
            err => reject(err)
        )
    })
}
export const apiIndexShow = (data) => {
    return new Promise((resolve, reject) => {
        post(indexShowApi, data).then(
            res => resolve(res),
            err => reject(err)
        )
    })
}
export const apiTextNext = (data) => {
    return new Promise((resolve, reject) => {
        post(textNextApi, data).then(
            res => resolve(res),
            err => reject(err)
        )
    })
}
export const apiReplyNext = (data) => {
    return new Promise((resolve, reject) => {
        post(replyNextApi, data).then(
            res => resolve(res),
            err => reject(err)
        )
    })
}
export const apiTitleDetail = (data) => {
    return new Promise((resolve, reject) => {
        post(titleDetailApi, data).then(
            res => resolve(res),
            err => reject(err)
        )
    })
}
export const apiTextSort = (data) => {
    return new Promise((resolve, reject) => {
        post(textSortApi, data).then(
            res => resolve(res),
            err => reject(err)
        )
    })
}