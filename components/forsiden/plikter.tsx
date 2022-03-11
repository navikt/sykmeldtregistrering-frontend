import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import styles from './guidepanel.module.css';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Plikter',
        sendeMeldekort: 'Du må sende meldekort hver 14. dag. Det er et krav for å få oppfølging og økonomisk støtte.',
        aktivArbeidssoker: 'Du må være aktiv arbeidssøker, søke på ledige stillinger og holde CV-en oppdatert.',
    },
};

const PlikterPanel = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <GuidePanel className={styles.plikter} poster>
            <Heading size={'small'}>{tekst('tittel')}</Heading>
            <ul>
                <li>{tekst('sendeMeldekort')}</li>
                <li>{tekst('aktivArbeidssoker')}</li>
            </ul>
        </GuidePanel>
    );
};

export default PlikterPanel;