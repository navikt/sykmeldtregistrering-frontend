import { lagApiPostHandlerMedAuthHeaders } from '../../lib/next-api-handler';

const opprettOppgaveUrl = `${process.env.OPPRETT_OPPGAVE_URL}`;
const opprettOppgaveHandler = lagApiPostHandlerMedAuthHeaders(opprettOppgaveUrl);

export default opprettOppgaveHandler;
