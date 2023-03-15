import lagApiHandlerMedAuthHeaders from '../../lib/next-api-handler';

const startRegistreringUrl = `${process.env.START_REGISTRERING_URL}`;
const startHandler = lagApiHandlerMedAuthHeaders(startRegistreringUrl);

export default startHandler;
