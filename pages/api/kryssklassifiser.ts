import type { NextApiRequest, NextApiResponse } from 'next';

async function kryssklassifiser(req: NextApiRequest, res: NextApiResponse<string>) {
    const styrkKode = req.query.styrkKode;
    const response = await fetch(
        'https://www.nav.no/arbeid/registrering/pam-janzz/rest/kryssklassifiserMedKonsept?kodeForOversetting=' +
            styrkKode
    );
    const json = await response.json();
    res.status(200).json(json);
}

export default kryssklassifiser;
