import getAPIUrl from "../../get-api-url";
import API_ROUTES from "../../routes";

let csrfToken: string | null = null

export const getCsrfToken = async () => {
    return '';
    if (csrfToken !== null) return csrfToken
    csrfToken = await fetchCsrfToken()
    console.log('getCsrfToken', {csrfToken})
    return csrfToken
}

export const fetchCsrfToken = async() => {
    const response = await fetch(getAPIUrl(API_ROUTES.AUTH_GET_CSRF_TOKEN))
    const data = await response.json()
    if (data.payload) {
        return data.payload.token
    }
    return null
}