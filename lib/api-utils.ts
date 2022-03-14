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

    const contentType = response.headers.get('Content-Type');
    if (contentType && /application\/json/.test(contentType)) {
        return await response.json();
    }
};
