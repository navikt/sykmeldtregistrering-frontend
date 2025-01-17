import { NextApiRequest, NextApiResponse } from 'next';
import { Config } from '../../model/config';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        selfUrl: process.env.NEXT_PUBLIC_SELF_URL!,
        startUrl: process.env.NEXT_PUBLIC_START_URL!,
        amplitudeApiKey: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!,
        amplitudeEndPoint: process.env.NEXT_PUBLIC_AMPLITUDE_ENDPOINT!,
        featureTogglesUrl: process.env.NEXT_PUBLIC_FEATURETOGGLES_URL!,
        dittNavUrl: process.env.NEXT_PUBLIC_DITTNAV_URL!,
        dagpengesoknadUrl: process.env.NEXT_PUBLIC_DAGPENGESOKNAD_URL!,
        dialogUrl: process.env.NEXT_PUBLIC_DIALOG_URL!,
        enableMock: process.env.NEXT_PUBLIC_ENABLE_MOCK!,
        loginUrl: `${process.env.LOGINSERVICE_URL}?redirect=${process.env.NEXT_PUBLIC_START_URL}`, // TODO
    } as Config);
}

export default handler;
