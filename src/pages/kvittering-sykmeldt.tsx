import { useEffect } from 'react';
import { BodyLong, GuidePanel, Heading, Link } from '@navikt/ds-react';

import useSprak from '../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../lib/amplitude';
import { useConfig } from '../contexts/config-context';
import { RegistreringType } from '../model/registrering';
import { Config } from '../model/config';

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

const KvitteringSykmeldt = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { dittNavUrl } = useConfig() as Config;

    useEffect(() => {
        loggAktivitet({
            aktivitet: 'Viser kvittering',
            registreringstype: RegistreringType.SYKMELDT_REGISTRERING,
        });
    }, []);

    return (
        <>
            <Heading level="1" spacing size={'medium'}>
                {tekst('header')}
            </Heading>
            <GuidePanel poster>
                <Heading level={'2'} spacing size={'medium'}>
                    {tekst('sykmeldtTittel')}
                </Heading>
                <BodyLong>{tekst('ingress')}</BodyLong>
            </GuidePanel>
            <a
                href={dittNavUrl}
                className="mhl navds-button navds-button--primary navds-button--medium"
                onClick={() =>
                    loggAktivitet({
                        aktivitet: 'Velger å lese mer om økonomisk støtte',
                        registreringstype: RegistreringType.SYKMELDT_REGISTRERING,
                    })
                }
            >
                {tekst('lesMer')}
            </a>
            <Link
                href={dittNavUrl}
                onClick={() =>
                    loggAktivitet({
                        aktivitet: 'Velger å ikke søke om økonomisk støtte',
                        registreringstype: RegistreringType.SYKMELDT_REGISTRERING,
                    })
                }
            >
                {tekst('skalIkkeSoke')}
            </Link>
        </>
    );
};

export default KvitteringSykmeldt;
