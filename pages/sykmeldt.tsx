import { BodyLong, Button, Cell, ContentContainer, Grid, GuidePanel, Heading, Label, Link } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import NextLink from 'next/link';
import SykmeldtVeiledningSvg from '../components/sykmeldtVeiledningSvg';
import { SkjemaSide } from '../model/skjema';

const TEKSTER: Tekster<string> = {
    nb: {
        hei: 'Hei, ',
        sykmeldtInformasjon:
            'Vi ser at du er sykmeldt, og at det begynner å nærme seg datoen du ikke lenger kan få sykepenger. Tror du at du snart er tilbake i jobb, eller vil du trenge noe mer fra arbeidsgiveren din eller NAV? Hvis du trenger mer veiledning, må du registrere deg og svare på noen spørsmål.',
        naarRegistrertTittel: 'Når du har registrert deg',
        faaVeiledning: 'får du veiledning om mulighetene dine',
        brukeAktivitetsplan: 'kan du bruke din egen aktivitetsplan',
        kravPaaStotte: 'får du vite om du har krav på annen økonomisk støtte',
        dialogMedVeileder: 'kan du ha dialog med veilederen din',
        registrerDegTittel: 'Registrer deg',
        registrerDegIngress:
            'Når du registrerer deg for å få mer veiledning, skal NAV vurdere hva slags informasjon, veiledning og hjelp du trenger. Du vil derfor få noen spørsmål om situasjonen din slik at du kan få riktig hjelp. Du kan endre på svarene hvis situasjonen din endrer seg. Det er bare veilederen din som kan se hva du har svart. Opplysningene dine blir lagret etter arkivloven. ',
        personopplysningerLenkeTekst: 'Les mer om hvordan NAV behandler personopplysninger.',
        startRegistrering: 'Start registrering',
    },
};
const SykmeldtStartside = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <ContentContainer>
            <Grid>
                <Cell xs={12}>
                    <GuidePanel>
                        <Label>{tekst('hei')}</Label>
                        {tekst('sykmeldtInformasjon')}
                    </GuidePanel>
                </Cell>
                <Cell xs={12}>
                    <Heading spacing size="medium">
                        {tekst('naarRegistrertTittel')}
                    </Heading>
                </Cell>
                <Cell xs={12} md={6}>
                    <ul>
                        <li>{tekst('faaVeiledning')}</li>
                        <li>{tekst('brukeAktivitetsplan')}</li>
                        <li>{tekst('kravPaaStotte')}</li>
                        <li>{tekst('dialogMedVeileder')}</li>
                    </ul>
                </Cell>
                <Cell xs={12} md={6}>
                    <SykmeldtVeiledningSvg />
                </Cell>
                <Cell xs={12}>
                    <Heading spacing size="medium">
                        {tekst('registrerDegTittel')}
                    </Heading>
                    <BodyLong spacing>
                        {tekst('registrerDegIngress')}
                        <Link href="https://www.nav.no/personvern" target="_blank">
                            {tekst('personopplysningerLenkeTekst')}
                        </Link>
                    </BodyLong>
                    <NextLink href={`/sykmeldt/${SkjemaSide.SykmeldtFremtidigSituasjon}`} passHref>
                        <Button>{tekst('startRegistrering')}</Button>
                    </NextLink>
                </Cell>
            </Grid>
        </ContentContainer>
    );
};

export default SykmeldtStartside;
