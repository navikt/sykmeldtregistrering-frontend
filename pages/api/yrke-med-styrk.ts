import type { NextApiRequest, NextApiResponse } from 'next';

async function yrkeMedStyrk(req: NextApiRequest, res: NextApiResponse<string>) {
    const yrke = req.query.yrke;
    const url = `${process.env.PAM_JANZZ_URL}/typeahead/yrke-med-styrk08?q=${yrke}`;
    const response = await fetch(url);
    const json = await response.json();
    res.status(200).json(json);
}

export default yrkeMedStyrk;
