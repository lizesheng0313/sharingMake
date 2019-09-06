import { fetch } from 'request/fetch'

export function apiGetCode() {
    return fetch.request({
        url: '/api/taxReport/getCaptcha',
    })
}