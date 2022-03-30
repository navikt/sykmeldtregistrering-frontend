import { Alert, BodyShort, Button, GuidePanel, Link } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useErrorContext } from '../../contexts/error-context';

const TEKSTER: Tekster<string> = {
    nb: {
        feilISystemene: 'På grunn av feil i systemene våre kan du ikke registrere deg akkurat nå.',
        provIgjen: 'Vennligst prøv igjen litt senere.',
        //TODO: Link til kontakt brukerstøtte:
        kontaktBrukerstotte: 'Kontakt teknisk brukerstøtte dersom problemene vedvarer.',
        //TODO: Fjerne "We're having trouble" her når vi har lagt inn engelske tekster:
        noeGikkGalt: "Noe gikk galt / We're having trouble",
        klarteIkkeMottaHenvendelse:
            'Vi klarte ikke å ta imot henvendelsen din. Vennligst forsøk igjen senere. Opplever du dette flere ganger kan du ringe oss på 55 55 33 33.',
        //TODO: Fjerne troubleWithYourRequest-teksten når vi har oversatt til engelsk:
        troubleWithYourRequest:
            'We’re having trouble with your request right now. Please try again later. If you are still having problems, you can call us on 55 55 33 33.',
    },
};

const FeilmeldingGenerell = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

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

const FeilmeldingNoeGikkGalt = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <GuidePanel>
            <Alert variant={'error'} className="mbm">
                <BodyShort>{tekst('noeGikkGalt')}</BodyShort>
            </Alert>
            <BodyShort spacing>{tekst('klarteIkkeMottaHenvendelse')}</BodyShort>
            <BodyShort>{tekst('troubleWithYourRequest')}</BodyShort>
        </GuidePanel>
    );
};

const GlobalFeilmelding = () => {
    const { error, setError } = useErrorContext();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

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

export { FeilmeldingGenerell, FeilmeldingNoeGikkGalt, GlobalFeilmelding };
