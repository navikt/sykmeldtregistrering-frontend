import type { NextApiRequest, NextApiResponse } from 'next';

async function startRegistrering (req: NextApiRequest, res: NextApiResponse<string>) {
    const response = await fetch('https://veilarbregistrering.party/startregistrering')
    const json = await response.json()
    res.status(200).json(json);
};

export default startRegistrering;