import { lagApiPostHandlerMedAuthHeaders } from '../../lib/next-api-handler';

const fullforRegistreringSykmeldtUrl = `${process.env.FULLFOR_REGISTRERING_SYKMELDT_URL}`;
const fullforHandler = lagApiPostHandlerMedAuthHeaders(fullforRegistreringSykmeldtUrl);

export default fullforHandler;
