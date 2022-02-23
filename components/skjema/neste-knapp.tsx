import skjemaStyles from '../../styles/skjema.module.css';
import { Button } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

const TEKSTER: Tekster<string> = {
    nb: {
        neste: 'Neste',
    },
};

const Neste = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    return (
        <div className={skjemaStyles.taCenter}>
            <Button>{tekst('neste')}</Button>
        </div>
    );
};

export default Neste;
