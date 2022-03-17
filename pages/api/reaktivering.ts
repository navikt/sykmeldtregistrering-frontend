import { NextApiRequest, NextApiResponse } from 'next';
import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';

const reaktiveringUrl = `${process.env.REAKTIVERING_URL}`;

const reaktiveringHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return lagApiHandlerMedAuthHeaders(reaktiveringUrl)(req, res);
    } else {
        return res.status(405).end();
    }
};

export default reaktiveringHandler;
