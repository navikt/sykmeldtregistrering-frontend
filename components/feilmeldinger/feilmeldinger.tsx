import { useEffect } from 'react';
import { Alert, BodyShort, Button, Link } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { loggStoppsituasjon } from '../../lib/amplitude';
import { useErrorContext } from '../../contexts/error-context';

const TEKSTER: Tekster<string> = {
    nb: {
        feilISystemene: 'På grunn av feil i systemene våre kan du ikke registrere deg akkurat nå.',
        provIgjen: 'Vennligst prøv igjen litt senere.',
        kontaktBrukerstotte: 'Kontakt teknisk brukerstøtte dersom problemene vedvarer.',
    },
};

const FeilmeldingGenerell = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    useEffect(() => {
        loggStoppsituasjon({
            situasjon: 'Arbeidssøkeren får en feilmelding',
        });
    }, []);

    return (
        <Alert variant={'error'}>
            <BodyShort spacing>{tekst('feilISystemene')}</BodyShort>
            <BodyShort spacing>{tekst('provIgjen')}</BodyShort>
            <BodyShort>
                <Link href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/kontakt-teknisk-brukerstotte-nav.no">
                    {tekst('kontaktBrukerstotte')}
                </Link>
            </BodyShort>
        </Alert>
    );
};

const GlobalFeilmelding = () => {
    const { error, setError } = useErrorContext();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    useEffect(() => {
        if (error) {
            loggStoppsituasjon({
                situasjon: 'Arbeidssøkeren får en feilmelding',
            });
        }
    }, [error]);

    if (!error) {
        return null;
    }

    return (
        <Alert variant={'error'}>
            <BodyShort spacing>{tekst('feilISystemene')}</BodyShort>
            <BodyShort spacing>{tekst('provIgjen')}</BodyShort>
            <BodyShort spacing>
                <Link href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/kontakt-teknisk-brukerstotte-nav.no">
                    {tekst('kontaktBrukerstotte')}
                </Link>
            </BodyShort>
            <BodyShort>
                <Button variant={'secondary'} onClick={() => setError(null)}>
                    Lukk
                </Button>
            </BodyShort>
        </Alert>
    );
};

export { FeilmeldingGenerell, GlobalFeilmelding };
