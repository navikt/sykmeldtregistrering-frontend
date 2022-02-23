import { TextField } from '@navikt/ds-react';
import { useCallback, useState } from 'react';
import styles from './sisteJobb.module.css';

interface StillingsSokProps {
    onClose: () => void;
}

interface SokeResultatProps {
    resultat: any;
}

const SokeResultat = (props: SokeResultatProps) => {
    const { resultat } = props;
    return (
        <ul className={styles.sokeResultat}>
            {resultat.map((r: any) => (
                <li key={r.title}>{r.title}</li>
            ))}
        </ul>
    );
};

const StillingsSok = (props: StillingsSokProps) => {
    const { onClose } = props;
    const [resultat, setResultat] = useState([] as any[]);
    const onChange = useCallback((q: string) => {
        // api kall
        setResultat([{ title: 'Test 1' }, { title: 'Test 2' }]);
    }, []);

    return (
        <div className={styles.stillingsSokWrapper}>
            <TextField
                autoFocus={true}
                /*onBlur={onClose}*/ onChange={(e) => {
                    onChange(e.target.value);
                }}
                label="Søk etter stilling"
            />
            {resultat.length > 0 && <SokeResultat resultat={resultat} />}
        </div>
    );
};

export default StillingsSok;
