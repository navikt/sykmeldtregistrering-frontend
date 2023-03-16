import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { exchangeIDPortenToken, getHeaders, getTokenFromRequest } from '../../lib/next-api-handler';
import { withAuthenticatedApi } from '../../auth/withAuthentication';

const url = `${process.env.SISTE_ARBEIDSFORHOLD_URL}`;

const sisteArbeidsforhold = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const tokenSet = await exchangeIDPortenToken(getTokenFromRequest(req)!);
    const token = tokenSet.access_token;

    const callId = nanoid();

    try {
        const { styrk } = await fetch(url, {
            headers: getHeaders(token!, callId),
        }).then((res) => res.json());

        const { konseptMedStyrk08List } = await fetch(
            `${process.env.PAM_JANZZ_URL}/kryssklassifiserMedKonsept?kodeForOversetting=${styrk}`,
            {
                headers: getHeaders(token!, callId),
            }
        ).then((res) => res.json());

        res.json(konseptMedStyrk08List[0]);
    } catch (e) {
        res.status(500).end(`${e}`);
    }
};

export default withAuthenticatedApi(sisteArbeidsforhold);
