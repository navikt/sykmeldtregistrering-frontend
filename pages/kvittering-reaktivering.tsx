import { useEffect } from 'react';
import { BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react';

import useSprak from '../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../lib/amplitude';
import { RegistreringType } from '../model/registrering';
import { useConfig } from '../contexts/config-context';
import { Config } from '../model/config';

const TEKSTER: Tekster<string> = {
    nb: {
        header: 'Du er nå registrert som arbeidssøker',
        dagpengerTittel: 'Du er nå registrert som arbeidssøker',
        permittert: 'Er du permittert eller arbeidsledig må du søke om dagpenger i egen søknad.',
        tidligstFaaDagpenger: 'Du kan tidligst få dagpenger fra den dagen du sender søknaden.',
        sendeSoknaden:
            'For å ikke tape dager med dagpenger må du sende søknaden senest samme dag som du ønsker dagpenger fra.',
        sokDagpenger: 'Søk dagpenger',
        skalIkkeSoke: 'Skal ikke søke nå',
    },
};

const Kvittering = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    useEffect(() => {
        loggAktivitet({
            aktivitet: 'Viser kvittering',
            registreringstype: RegistreringType.REAKTIVERING,
        });
    }, []);

    const { dagpengesoknadUrl, dittNavUrl } = useConfig() as Config;

    return (
        <>
            <Heading spacing level="1" size={'large'}>
                {tekst('header')}
            </Heading>
            <GuidePanel poster>
                <Heading level={'2'} spacing size={'medium'}>
                    {tekst('dagpengerTittel')}
                </Heading>
                <BodyShort spacing>{tekst('permittert')}</BodyShort>
                <BodyShort spacing>{tekst('tidligstFaaDagpenger')}</BodyShort>
                <BodyShort spacing>{tekst('sendeSoknaden')}</BodyShort>
            </GuidePanel>
            <a
                href={dagpengesoknadUrl}
                onClick={() =>
                    loggAktivitet({
                        aktivitet: 'Går til dagpenger fra kvittering',
                        registreringstype: RegistreringType.REAKTIVERING,
                    })
                }
                className="mhl navds-button navds-button--primary navds-button--medium"
            >
                {tekst('sokDagpenger')}
            </a>
            <Link
                href={dittNavUrl}
                onClick={() =>
                    loggAktivitet({
                        aktivitet: 'Velger å ikke gå til dagpenger fra kvittering',
                        registreringstype: RegistreringType.REAKTIVERING,
                    })
                }
            >
                {tekst('skalIkkeSoke')}
            </Link>
        </>
    );
};

export default Kvittering;
