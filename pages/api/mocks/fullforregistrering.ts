import { NextApiRequest, NextApiResponse } from 'next';

const fullforHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { body } = req;
        console.log('body', body);
        return res.status(200).json({});
    } else {
        return res.status(400).end();
    }
};

export default fullforHandler;
