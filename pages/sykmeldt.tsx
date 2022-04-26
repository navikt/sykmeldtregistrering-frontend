import { BodyLong, Button, Cell, ContentContainer, Grid, GuidePanel, Heading, Label, Link } from '@navikt/ds-react';
import NextLink from 'next/link';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import VeiledningSvg from '../components/veiledningSvg';
import { SkjemaSide } from '../model/skjema';
import { Kontaktinformasjon } from '../model/kontaktinformasjon';
import { getHeaders } from '../lib/next-api-handler';
import { nanoid } from 'nanoid';
import { NextPageContext } from 'next';
import cookie from 'cookie';

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
        fortsettRegistrering: 'Fortsett registrering',
    },
};

interface SykmeldtProps {
    kontaktinformasjon?: Kontaktinformasjon;
}

const SykmeldtStartside = (props: SykmeldtProps) => {
    const { kontaktinformasjon } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <ContentContainer>
            <Grid>
                <Cell xs={12}>
                    <GuidePanel>
                        <Label>
                            {tekst('hei')}
                            {kontaktinformasjon?.navn.fornavn}
                        </Label>
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
                    <VeiledningSvg />
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
                    <NextLink href={`/sykmeldt/${SkjemaSide.SykmeldtFremtidigSituasjon}`} passHref locale={false}>
                        <Button>{tekst('fortsettRegistrering')}</Button>
                    </NextLink>
                </Cell>
            </Grid>
        </ContentContainer>
    );
};

export const getServerSideProps = async (context: NextPageContext) => {
    const kontaktinformasjonUrl = `${process.env.KONTAKTINFORMASJON_URL}`;

    try {
        const cookies = cookie.parse(context.req?.headers.cookie || '');
        const idToken = cookies['selvbetjening-idtoken'];
        const response = await fetch(kontaktinformasjonUrl, { headers: getHeaders(idToken, nanoid()) });
        const kontaktinformasjon = await response.json();
        return {
            props: {
                kontaktinformasjon,
            },
        };
    } catch (e) {
        return {
            props: {},
        };
    }
};

export default SykmeldtStartside;
