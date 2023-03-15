import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { getHeaders } from '../../lib/next-api-handler';
import { withAuthenticatedApi } from '../../auth/withAuthentication';

const url = `${process.env.SISTE_ARBEIDSFORHOLD_URL}`;

const sisteArbeidsforhold = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const idtoken = req.cookies['selvbetjening-idtoken'];
    const callId = nanoid();

    try {
        const { styrk } = await fetch(url, {
            headers: getHeaders(idtoken, callId),
        }).then((res) => res.json());

        const { konseptMedStyrk08List } = await fetch(
            `${process.env.PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=${styrk}`,
            {
                headers: getHeaders(idtoken, callId),
            }
        ).then((res) => res.json());

        res.json(konseptMedStyrk08List[0]);
    } catch (e) {
        res.status(500).end(`${e}`);
    }
};

export default withAuthenticatedApi(sisteArbeidsforhold);
