import Link from 'next/link';
import { BodyShort, Heading } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Dine opplysninger',
        innledning:
            'NAV vurderer hva slags veiledning du trenger når du registrerer deg som jobbsøker. For å gjøre denne vurderingen må vi ha opplysninger om',
        alder: 'alderen din',
        jobb: 'du har vært i jobb',
        utdanning: 'utdanningen din',
        utfordringer: 'eventuelle utfordringer',
        beskrivelse: `Hvis det skjer endringer som gjør at opplysningene du har gitt oss ikke er riktige lenger, kan du ta kontakt med oss på nav.no. Da gjør vi en ny vurdering av ditt behov for tjenester.
      Vi har også opplysninger om arbeidssøkere i omtrent samme situasjon som deg. Det gjør at vi kan anta noe om mulighetene dine til å finne en jobb. På bakgrunn av dette blir det laget et automatisk forslag til hvilke tjenester vi tror kan passe for deg. Dette forslaget kaller vi profilering. En veileder vurderer forslaget og sender deg et vedtak i posten.`,
        overskriftPersonopplysninger: 'Behandling av personopplysninger',
        personopplysninger:
            'Opplysningene dine blir lagret etter arkivloven. NAV bruker anonymiserte personopplysninger om arbeidssøkere til å lage offentlig statistikk om arbeidsmarkedet.',
        personopplysningerLenkeTekst: `Les mer om hvordan NAV behandler personopplysninger`,
        tips: 'Tips! Du må fullføre registreringen før du kan søke om dagpenger.',
    },
};

const dineOpplysninger = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>
            <BodyShort>{tekst('innledning')}</BodyShort>
            <BodyShort>
                <ul>
                    <li>{tekst('alder')}</li>
                    <li>{tekst('jobb')}</li>
                    <li>{tekst('utdanning')}</li>
                    <li>{tekst('utfordringer')}</li>
                </ul>
            </BodyShort>
            <BodyShort>{tekst('beskrivelse')}</BodyShort>
            <Heading spacing size={'medium'} level="2">
                {tekst('overskriftPersonopplysninger')}
            </Heading>
            <BodyShort>{tekst('personopplysninger')}</BodyShort>
            <BodyShort>
                <Link href="https://www.nav.no/personvern">
                    <a>{tekst('personopplysningerLenkeTekst')}</a>
                </Link>
            </BodyShort>
            <BodyShort>{tekst('tips')}</BodyShort>
        </>
    );
};

export default dineOpplysninger;
