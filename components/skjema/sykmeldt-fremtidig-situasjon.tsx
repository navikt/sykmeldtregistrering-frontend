import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import useSprak from '../../hooks/useSprak';
import { Panel } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { FremtidigSituasjon, hentTekst, SporsmalId } from '../../model/sporsmal';
import styles from '../../styles/skjema.module.css';

const SykmeldtFremtidigSituasjon = (props: SkjemaKomponentProps<FremtidigSituasjon>) => {
    const sprak = useSprak();
    const tekst = (key: string) => hentTekst(sprak, key);
    const { onChange, valgt, visFeilmelding } = props;

    const lagValg = (valg: FremtidigSituasjon) => ({ tekst: tekst(valg), value: valg });
    const valg = [
        lagValg(FremtidigSituasjon.SAMME_ARBEIDSGIVER),
        lagValg(FremtidigSituasjon.SAMME_ARBEIDSGIVER_NY_STILLING),
        lagValg(FremtidigSituasjon.NY_ARBEIDSGIVER),
        lagValg(FremtidigSituasjon.USIKKER),
        lagValg(FremtidigSituasjon.INGEN_PASSER),
    ];

    return (
        <Panel className={styles.panel} border={true}>
            <form>
                <RadioGruppe
                    legend={tekst(SporsmalId.fremtidigSituasjon)}
                    valg={valg}
                    onSelect={(val) => onChange(val)}
                    valgt={valgt}
                    visFeilmelding={visFeilmelding}
                />
            </form>
        </Panel>
    );
};

export default SykmeldtFremtidigSituasjon;
