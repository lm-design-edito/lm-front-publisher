export const post = (request: string, options?: RequestInit) => {
    return fetch(request, {
        method: 'POST',
        ...options,
    });
}