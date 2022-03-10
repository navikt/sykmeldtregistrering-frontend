import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';

const url = `${process.env.SISTE_ARBEIDSFORHOLD_URL}`;
const sisteArbeidsforhold = lagApiHandlerMedAuthHeaders(url);

export default sisteArbeidsforhold;
