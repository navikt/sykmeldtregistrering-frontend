import { Heading } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import styles from './header.module.css';

const TEKSTER: Tekster<string> = {
    nb: {
        registrering: 'Registrering',
    },
    en: {
        registrering: 'Registration',
    },
};

const Header = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <header className={styles.header}>
            <Heading spacing size="medium" level="3" style={{ marginBottom: 0}}>
                {tekst('registrering')}
            </Heading>
        </header>
    );
};

export default Header;
