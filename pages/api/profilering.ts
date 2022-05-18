import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';

const hentProfileringUrl = `${process.env.HENT_PROFILERING_URL}`;
const profileringHandler = lagApiHandlerMedAuthHeaders(hentProfileringUrl);

export default profileringHandler;
