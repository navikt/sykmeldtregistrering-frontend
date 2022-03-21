import { NextApiRequest, NextApiResponse } from 'next';
import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';

const fullforRegistreringSykmeldtUrl = `${process.env.FULLFOR_REGISTRERING_SYKMELDT_URL}`;

const fullforHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return lagApiHandlerMedAuthHeaders(fullforRegistreringSykmeldtUrl)(req, res);
    } else {
        return res.status(405).end();
    }
};

export default fullforHandler;
