import useSprak from '../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import { BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { RegistreringType } from '../model/registrering';
import { loggAktivitet } from '../lib/amplitude-typescript';

const TEKSTER: Tekster<string> = {
    nb: {
        header: 'Du kan nå få mer veiledning',
        sykmeldtTittel: 'Videre støtte etter sykepenger',
        ingress:
            'Hvis du skal søke om økonomisk støtte etter at retten til sykepenger tar slutt, må du gjøre det i en egen søknad.',
        lesMer: 'Les mer',
        skalIkkeSoke: 'Skal ikke søke nå',
    },
};

const VTA_URL = '';
const KvitteringSykmeldt = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    React.useEffect(() => {
        loggAktivitet({
            aktivitet: 'Viser kvittering',
            registreringstype: RegistreringType.SYKMELDT_REGISTRERING,
        });
    }, []);

    return (
        <>
            <Heading spacing size={'medium'}>
                {tekst('header')}
            </Heading>
            <GuidePanel poster>
                <Heading level={'2'} spacing size={'medium'}>
                    {tekst('sykmeldtTittel')}
                </Heading>
                <BodyShort>{tekst('ingress')}</BodyShort>
            </GuidePanel>

            <section className="flex-center mhl">
                <a href={VTA_URL} className="navds-button navds-button--primary navds-button--medium mrl">
                    {tekst('lesMer')}
                </a>
                <Link href={VTA_URL}>{tekst('skalIkkeSoke')}</Link>
            </section>
        </>
    );
};

export default KvitteringSykmeldt;
