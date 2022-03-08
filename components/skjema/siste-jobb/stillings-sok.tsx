import { useCallback, useState } from 'react';
import styles from './sisteJobb.module.css';
const Autosuggest = require('react-autosuggest');

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
    const [value, setValue] = useState<string>('');

    const onSuggestionsFetchRequested = useCallback(
        ({ value: string }) => {
            // api kall
            setTimeout(() => {
                setResultat([{ title: 'Test 1' }, { title: 'Test 2' }]);
            }, 1000);
        },
        [setResultat]
    );

    const inputProps = {
        value,
        className: 'navds-text-field__input navds-body-short navds-body-medium',
        onChange: (e: any) => setValue(e.target.value),
    };

    return (
        <div className={styles.stillingsSokWrapper}>
            <Autosuggest
                suggestions={resultat}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={() => console.log('onSuggestionsClearRequested')}
                getSuggestionValue={(val: any) => console.log('getSuggestionValue', val)}
                renderSuggestion={(val: any) => {
                    console.log('renderSuggestion', val);
                    return <div>val</div>;
                }}
                inputProps={inputProps}
            />
        </div>
    );
};

export default StillingsSok;
