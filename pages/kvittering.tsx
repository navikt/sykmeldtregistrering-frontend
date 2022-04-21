import { BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react';
import useSprak from '../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../lib/amplitude-typescript';
import React from 'react';
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

    React.useEffect(() => {
        loggAktivitet({
            aktivitet: 'Viser kvittering',
            registreringstype: RegistreringType.ORDINAER_REGISTRERING,
        });
    }, []);

    const { dagpengesoknadUrl, dittNavUrl } = useConfig() as Config;

    return (
        <>
            <Heading spacing size={'medium'}>
                {tekst('header')}
            </Heading>
            <GuidePanel poster>
                <Heading level={'2'} spacing size={'medium'}>
                    {tekst('dagpengerTittel')}
                </Heading>
                <BodyShort>{tekst('permittert')}</BodyShort>
                <BodyShort>{tekst('tidligstFaaDagpenger')}</BodyShort>
                <BodyShort>{tekst('sendeSoknaden')}</BodyShort>
            </GuidePanel>

            <section className="flex-center mhl">
                <a
                    href={dagpengesoknadUrl}
                    onClick={() =>
                        loggAktivitet({
                            aktivitet: 'Går til dagpenger fra kvittering',
                            registreringstype: RegistreringType.ORDINAER_REGISTRERING,
                        })
                    }
                    className="navds-button navds-button--primary navds-button--medium mrl"
                >
                    {tekst('sokDagpenger')}
                </a>
                <Link
                    href={dittNavUrl}
                    onClick={() =>
                        loggAktivitet({
                            aktivitet: 'Velger å ikke gå til dagpenger fra kvittering',
                            registreringstype: RegistreringType.ORDINAER_REGISTRERING,
                        })
                    }
                >
                    {tekst('skalIkkeSoke')}
                </Link>
            </section>
        </>
    );
};

export default Kvittering;
