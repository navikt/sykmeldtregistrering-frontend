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

export const lagApiPostHandlerMedAuthHeaders: (
    url: string,
    errorHandler?: (response: Response) => void
) => NextApiHandler | undefined = (url: string, errorHandler) => async (req, res) => {
    if (req.method === 'POST') {
        return lagApiHandlerMedAuthHeaders(url, errorHandler)(req, res);
    } else {
        res.status(405).end();
    }
};

export interface ApiError extends Error {
    status?: number;
}

const lagApiHandlerMedAuthHeaders: (url: string, errorHandler?: (response: Response) => void) => NextApiHandler =
    (url: string, errorHandler) => async (req, res) => {
        const idtoken = req.cookies['selvbetjening-idtoken'];
        const callId = nanoid();
        let body = null;

        if (req.method === 'POST') {
            body = req.body;
        }

        try {
            console.log(`Starter kall callId: ${callId} mot ${url}`);
            const response = await fetch(url, {
                method: req.method,
                body,
                headers: getHeaders(idtoken, callId),
            }).then(async (apiResponse) => {
                console.log(`Kall callId: ${callId} mot ${url} er ferdig`);
                const contentType = apiResponse.headers.get('content-type');
                const statusCode = apiResponse.status;

                if (statusCode === 204) {
                    return apiResponse;
                }

                if (!apiResponse.ok) {
                    console.error(`apiResponse ikke ok, contentType: ${contentType}, callId - ${callId}`);
                    if (typeof errorHandler === 'function') {
                        return errorHandler(apiResponse);
                    } else {
                        const error = new Error(apiResponse.statusText) as ApiError;
                        error.status = apiResponse.status;
                        throw error;
                    }
                }

                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError(
                        `Fikk ikke JSON fra ${url} (callId ${callId}). Body: ${await apiResponse.text()}.`
                    );
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
