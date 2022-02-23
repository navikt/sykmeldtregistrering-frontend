import skjemaStyles from '../../styles/skjema.module.css';
import { Alert, Button } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useCallback, useEffect, useState } from 'react';

const TEKSTER: Tekster<string> = {
    nb: {
        neste: 'Neste',
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
    },
};

interface NesteProps {
    onClick?: () => void;
    isValid?: boolean;
}

const Neste = (props: NesteProps) => {
    const { onClick, isValid } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    useEffect(() => {
        if (isValid) {
            settVisFeilmelding(!isValid);
        }
    }, [isValid]);

    const onButtonClick = useCallback(() => {
        if (!isValid) {
            settVisFeilmelding(true);
            return;
        }

        onClick && onClick();
    }, [isValid, onClick]);

    return (
        <>
            {visFeilmelding && <Alert variant="warning">{tekst('advarsel')}</Alert>}
            <div className={skjemaStyles.taCenter}>
                <Button onClick={onButtonClick}>{tekst('neste')}</Button>
            </div>
        </>
    );
};

export default Neste;
