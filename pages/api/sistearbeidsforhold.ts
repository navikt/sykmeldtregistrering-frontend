import type { NextApiRequest, NextApiResponse } from 'next';

async function sisteArbeidsforhold(req: NextApiRequest, res: NextApiResponse<string>) {
    const url = process.env.SISTE_ARBEIDSFORHOLD_URL;
    const response = await fetch(url!);
    const json = await response.json();
    res.status(200).json(json);
}

export default sisteArbeidsforhold;
