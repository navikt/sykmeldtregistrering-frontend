import { Heading } from '@navikt/ds-react';
import useSprak from '../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Oppgave opprettet',
    },
};

const KvitteringOppgave = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <Heading spacing size={'medium'}>
                {tekst('tittel')}
            </Heading>
        </>
    );
};

export default KvitteringOppgave;
