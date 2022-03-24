import { lagApiPostHandlerMedAuthHeaders } from '../../lib/next-api-handler';

const fullforRegistreringUrl = `${process.env.FULLFOR_REGISTRERING_URL}`;
const fullforHandler = lagApiPostHandlerMedAuthHeaders(fullforRegistreringUrl);

export default fullforHandler;
