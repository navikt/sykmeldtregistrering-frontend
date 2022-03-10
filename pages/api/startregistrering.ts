import type { NextApiHandler } from 'next';
import { nanoid } from 'nanoid';

const startRegistreringUrl = `${process.env.START_REGISTRERING_URL}`;

const startHandler: NextApiHandler = async (req, res) => {
    const idtoken = req.cookies['selvbetjening-idtoken'];
    const callId = nanoid();
    try {
        const response = await fetch(startRegistreringUrl.toString(), {
            headers: {
                cookie: `selvbetjening-idtoken=${idtoken}`,
                'Nav-Consumer-Id': 'poa-arbeidssokerregistrering',
                'Nav-Call-Id': callId,
            },
        }).then(async (apiResponse) => {
            const contentType = apiResponse.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError(
                    `Fikk ikke JSON fra startregistrering API (callId ${callId}). Body: ${await apiResponse.text()}.`
                );
            }

            return apiResponse.json();
        });

        return res.json(response);
    } catch (error) {
        console.error(`Kall mot startregistrering API (callId: ${callId}) feilet. Feilmelding: ${error}`);

        res.status(500).end(`Noe gikk galt (callId: ${callId})`);
    }
};

export default startHandler;
