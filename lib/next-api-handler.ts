import { NextApiHandler } from 'next';
import { nanoid } from 'nanoid';

export const getHeaders = (idtoken: string, callId: string) => {
    return {
        cookie: `selvbetjening-idtoken=${idtoken}`,
        'Nav-Consumer-Id': 'poa-arbeidssokerregistrering',
        'Nav-Call-Id': callId,
        'Content-Type': 'application/json',
    };
};

export const lagApiPostHandlerMedAuthHeaders: (url: string) => NextApiHandler | undefined =
    (url: string) => async (req, res) => {
        if (req.method === 'POST') {
            return lagApiHandlerMedAuthHeaders(url)(req, res);
        } else {
            res.status(405).end();
        }
    };

interface ApiError extends Error {
    status?: number;
}

const lagApiHandlerMedAuthHeaders: (url: string) => NextApiHandler = (url: string) => async (req, res) => {
    const idtoken = req.cookies['selvbetjening-idtoken'];
    const callId = nanoid();
    let body = null;

    if (req.method === 'POST') {
        body = req.body;
    }

    try {
        const response = await fetch(url, {
            method: req.method,
            body,
            headers: getHeaders(idtoken, callId),
        }).then(async (apiResponse) => {
            const contentType = apiResponse.headers.get('content-type');
            const statusCode = apiResponse.status;

            if (statusCode === 204) {
                return apiResponse;
            }

            if (!apiResponse.ok) {
                console.error(`apiResponse ikke ok callId - ${callId}`);
                console.error(`contentType: ${contentType} callId - ${callId}`);
                if (contentType && contentType.includes('application/json')) {
                    return apiResponse.json();
                } else {
                    const error = new Error(apiResponse.statusText) as ApiError;
                    error.status = apiResponse.status;
                    throw error;
                }
            }

            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError(`Fikk ikke JSON fra ${url} (callId ${callId}). Body: ${await apiResponse.text()}.`);
            }

            return apiResponse.json();
        });

        return res.json(response);
    } catch (error) {
        console.error(`Kall mot ${url} (callId: ${callId}) feilet. Feilmelding: ${error}`);
        res.status((error as ApiError).status || 500).end(`Noe gikk galt (callId: ${callId})`);
    }
};

export default lagApiHandlerMedAuthHeaders;
