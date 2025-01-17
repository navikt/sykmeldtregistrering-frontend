import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';

async function features(req: NextApiRequest, res: NextApiResponse) {
    try {
        const url = `${process.env.FEATURE_TOGGLE_URL}`;
        const response = await fetch(url);
        const json = await response.json();
        const features = json.features || [];
        return res.status(200).json(features);
    } catch (error) {
        logger.error(error);
        return res.status(200).json([]);
    }
}

export default features;
