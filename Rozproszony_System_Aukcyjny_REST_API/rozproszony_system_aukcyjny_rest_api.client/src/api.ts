export const apiFetch = (url: string, options: any = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
    return fetch(url, { ...options, headers });
};