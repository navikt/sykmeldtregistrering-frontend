import { NextApiHandler } from 'next';
import { nanoid } from 'nanoid';

type Method = 'POST';

interface Options {
    method: Method;
    body: Object;
}

const lagApiHandlerMedAuthHeaders: (url: string, options?: Options) => NextApiHandler =
    (url: string, options?: Options) => async (req, res) => {
        const idtoken = req.cookies['selvbetjening-idtoken'];
        const callId = nanoid();
        try {
            const response = await fetch(url, {
                method: options?.method || 'GET',
                body: options ? JSON.stringify(options.body) : null,
                headers: {
                    cookie: `selvbetjening-idtoken=${idtoken}`,
                    'Nav-Consumer-Id': 'poa-arbeidssokerregistrering',
                    'Nav-Call-Id': callId,
                },
            }).then(async (apiResponse) => {
                const contentType = apiResponse.headers.get('content-type');
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

            res.status(500).end(`Noe gikk galt (callId: ${callId})`);
        }
    };

export default lagApiHandlerMedAuthHeaders;
