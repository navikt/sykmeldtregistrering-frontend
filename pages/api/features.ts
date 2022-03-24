import type { NextApiRequest, NextApiResponse } from 'next';

async function features(req: NextApiRequest, res: NextApiResponse) {
    try {
        const url = `${process.env.FEATURE_TOGGLE_URL}`;
        const response = await fetch(url);
        const json = await response.json();
        const features = json.features || [];
        res.status(200).json(features);
    } catch (error) {
        console.log(error);
        res.status(200).json([]);
    }
}

export default features;
