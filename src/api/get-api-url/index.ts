const getAPIUrl = (ressource: string) => {
    return`${import.meta.env.VITE_API_URL}${ressource ? `/${ressource}` : ''}`;
}
export default getAPIUrl;