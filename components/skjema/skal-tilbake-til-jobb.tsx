import { Button, Cell, Grid, GuidePanel, Heading, Panel } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import styles from './knapperad/knapperad.module.css';
import { TilbakeKnapp } from './tilbake-knapp';
import Neste from './neste-knapp';

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
    return (
        <>
            <GuidePanel className="mbl">
                <Heading size="medium">{tekst('hei')}Test</Heading>
                {tekst('infoTekst')}
            </GuidePanel>

            <Panel border={true} className="mbl">
                <Heading size="large">{tekst('tittel')}</Heading>
                <ul>
                    <li>{tekst('punkt1')}</li>
                    <li>{tekst('punkt2')}</li>
                </ul>
            </Panel>

            <Heading size="medium" spacing={true}>
                {tekst('enigTittel')}
            </Heading>
            <Grid>
                <Cell xs={12} md={6}>
                    <Button variant="secondary">{tekst('uenig')}</Button>
                </Cell>

                <Cell xs={6} className={styles.knapp}>
                    <Button variant="secondary">{tekst('enig')}</Button>
                </Cell>
            </Grid>
        </>
    );
};

export default SkalTilbakeTilJobb;
