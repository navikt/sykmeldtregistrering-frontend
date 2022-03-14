import getConfig from 'next/config';

const { basePath } = getConfig().publicRuntimeConfig;

const getUrl = (path: string) => `${basePath}/${path}`;

export const fetcher = async (path: string, opts?: RequestInit) => {
    const response = await fetch(getUrl(path), {
        ...opts,
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    if (response.headers.get('Content-type') === 'application/json') {
        return await response.json();
    }
};
