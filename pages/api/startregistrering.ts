import type { NextApiRequest, NextApiResponse } from 'next';

async function startRegistrering(req: NextApiRequest, res: NextApiResponse<string>) {
    const url = process.env.START_REGISTRERING_URL;
    const response = await fetch(url!);
    const json = await response.json();
    res.status(200).json(json);
}

export default startRegistrering;
