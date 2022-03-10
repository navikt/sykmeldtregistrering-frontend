import { NextApiHandler } from 'next';
import { nanoid } from 'nanoid';

const lagApiHandlerMedAuthHeaders: (url: string) => NextApiHandler = (url: string) => async (req, res) => {
    const idtoken = req.cookies['selvbetjening-idtoken'];
    const callId = nanoid();
    try {
        const response = await fetch(url, {
            headers: {
                cookie: `selvbetjening-idtoken=${idtoken}`,
                'Nav-Consumer-Id': 'poa-arbeidssokerregistrering',
                'Nav-Call-Id': callId,
            },
        }).then(async (apiResponse) => {
            const contentType = apiResponse.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError(`Fikk ikke JSON fra ${url} (callId ${callId}). Body: ${await apiResponse.text()}.`);
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
