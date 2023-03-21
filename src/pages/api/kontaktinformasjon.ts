import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';
import { withAuthenticatedApi } from '../../auth/withAuthentication';

const kontaktinformasjonUrl = `${process.env.KONTAKTINFORMASJON_URL}`;
const kontaktinformasjonHandler = lagApiHandlerMedAuthHeaders(kontaktinformasjonUrl);

export default withAuthenticatedApi(kontaktinformasjonHandler);
