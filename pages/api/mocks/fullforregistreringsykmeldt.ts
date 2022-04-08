import { NextApiRequest, NextApiResponse } from 'next';

const fullforHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { body } = req;
        console.log('body', body);
        return res.status(204).end();
    } else {
        return res.status(405).end();
    }
};

export default fullforHandler;
