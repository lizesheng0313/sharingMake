import { fetch } from 'request/fetch'

export function apiGetCode() {
    return fetch({
        url: '/api/taxReport/getCaptchaId',
    })
}