import { BodyLong, Button, Cell, ContentContainer, Grid, Heading } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import NextLink from 'next/link';

const TEKSTER: Tekster<string> = {
    nb: {
        naarRegistrertTittel: 'Når du har registrert deg',
        faaVeiledning: 'får du veiledning om mulighetene dine',
        brukeAktivitetsplan: 'kan du bruke din egen aktivitetsplan',
        kravPaaStotte: 'får du vite om du har krav på annen økonomisk støtte',
        dialogMedVeileder: 'kan du ha dialog med veilederen din',
        seVideo: 'Se video om aktivitetsplanen',
        registrerDegTittel: 'Registrer deg',
        registrerDegIngress:
            'Når du registrerer deg for å få mer veiledning, skal NAV vurdere hva slags informasjon, veiledning og hjelp du trenger. Du vil derfor få noen spørsmål om situasjonen din slik at du kan få riktig hjelp. Du kan endre på svarene hvis situasjonen din endrer seg. Det er bare veilederen din som kan se hva du har svart. Opplysningene dine blir lagret etter arkivloven. Les mer om hvordan NAV behandler personopplysninger.',
        startRegistrering: 'Start registrering',
    },
};
const SykmeldtStartside = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <>
            <ContentContainer>
                <Grid>
                    <Cell xs={12}>
                        <Heading spacing size="medium">
                            {tekst('naarRegistrertTittel')}
                        </Heading>
                        <ul>
                            <li>{tekst('faaVeiledning')}</li>
                            <li>{tekst('brukeAktivitetsplan')}</li>
                            <li>{tekst('kravPaaStotte')}</li>
                            <li>{tekst('dialogMedVeileder')}</li>
                        </ul>
                        <Button variant="secondary">{tekst('seVideo')}</Button>
                    </Cell>
                    <Cell xs={12}>
                        <Heading spacing size="medium">
                            {tekst('registrerDegTittel')}
                        </Heading>
                        <BodyLong spacing>{tekst('registrerDegIngress')}</BodyLong>
                        <NextLink href="/sykmeldt/0" passHref>
                            <Button>{tekst('startRegistrering')}</Button>
                        </NextLink>
                    </Cell>
                </Grid>
            </ContentContainer>
        </>
    );
};

export default SykmeldtStartside;
