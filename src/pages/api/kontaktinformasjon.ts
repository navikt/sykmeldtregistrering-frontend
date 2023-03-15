import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';

const kontaktinformasjonUrl = `${process.env.KONTAKTINFORMASJON_URL}`;
const kontaktinformasjonHandler = lagApiHandlerMedAuthHeaders(kontaktinformasjonUrl);

export default kontaktinformasjonHandler;
