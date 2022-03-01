import type { NextApiRequest, NextApiResponse } from 'next';

async function sisteArbeidsforhold(req: NextApiRequest, res: NextApiResponse<string>) {
    const response = await fetch('https://veilarbregistrering.party/sistearbeidsforhold');
    const json = await response.json();
    res.status(200).json(json);
}

export default sisteArbeidsforhold;
