import { Button, GuidePanel, Heading, Panel } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import styles from '../../styles/skjema.module.css';
import { useRouter } from 'next/router';
import { SkjemaSide } from '../../model/skjema';

const TEKSTER: Tekster<string> = {
    nb: {
        hei: 'Hei, ',
        infoTekst:
            'På spørsmål om hva du mener er din fremtidige situasjon, har du svart at du skal tilbake i full jobb før du har vært sykmeldt i 52 uker.',
        tittel: 'Fordi du skal tilbake i full jobb innen 52 uker',
        punkt1: 'har du ikke rett til videre økonomisk støtte fra NAV etter at du er tilbake i jobb',
        punkt2: 'tror vi ikke du trenger mer veiledning fra NAV i tillegg til det du allerede har fått og får i dag',
        infoVarsel: 'Hvis situasjonen din endrer seg, er det viktig at du tar kontakt med veilederen din.',
        enigTittel: 'Er du enig i NAV sin vurdering over?',
        enig: 'Enig',
        uenig: 'Uenig, jeg trenger mer veiledning',
    },
};
const SkalTilbakeTilJobb = (props: any) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();
    const navigerTilSide = (side: string) => router.push(side);

    return (
        <div>
            <GuidePanel className="mbl">
                <Heading size="medium">{tekst('hei')}Test</Heading>
                {tekst('infoTekst')}
            </GuidePanel>

            <Panel border={true} className="mbl">
                <Heading size="medium">{tekst('tittel')}</Heading>
                <ul>
                    <li>{tekst('punkt1')}</li>
                    <li>{tekst('punkt2')}</li>
                </ul>
            </Panel>
            <Heading size="medium" spacing={true} style={{ textAlign: 'center' }}>
                {tekst('enigTittel')}
            </Heading>

            <section className="flex-center flex-wrap">
                <Button
                    variant="secondary"
                    className="mrl mbs"
                    onClick={() => navigerTilSide(`/sykmeldt/${SkjemaSide.Oppsummering}`)}
                >
                    {tekst('uenig')}
                </Button>
                <Button variant="secondary" className="mbs" onClick={() => navigerTilSide('/')}>
                    {tekst('enig')}
                </Button>
            </section>
        </div>
    );
};

export default SkalTilbakeTilJobb;
