import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';
import { withAuthenticatedApi } from '../../auth/withAuthentication';

const hentProfileringUrl = `${process.env.HENT_PROFILERING_URL}`;
const profileringHandler = lagApiHandlerMedAuthHeaders(hentProfileringUrl);

export default withAuthenticatedApi(profileringHandler);
