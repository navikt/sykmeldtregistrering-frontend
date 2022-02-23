import skjemaStyles from '../../styles/skjema.module.css';
import { Link } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

const TEKSTER: Tekster<string> = {
    nb: {
        avbryt: 'Avbryt registreringen',
    },
};

const Avbryt = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <div className={skjemaStyles.taCenter}>
            <Link href="#">{tekst('avbryt')}</Link>
        </div>
    );
};

export default Avbryt;
