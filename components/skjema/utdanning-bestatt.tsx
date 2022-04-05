import useSprak from '../../hooks/useSprak';
import { Panel } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import { hentTekst, JaEllerNei, SporsmalId } from '../../model/sporsmal';
import styles from '../../styles/skjema.module.css';

const BestattUtdanning = (props: SkjemaKomponentProps<JaEllerNei>) => {
    const sprak = useSprak();
    const tekst = (key: string) => hentTekst(sprak, key);
    const { onChange, valgt, visFeilmelding } = props;
    const lagValg = (valg: JaEllerNei) => ({ tekst: tekst(valg), value: valg });
    const valg = [lagValg(JaEllerNei.JA), lagValg(JaEllerNei.NEI)];

    return (
        <Panel className={styles.panel} border={true}>
            <form>
                <RadioGruppe
                    legend={tekst(SporsmalId.utdanningBestatt)}
                    valg={valg}
                    onSelect={(val) => onChange(val)}
                    valgt={valgt}
                    visFeilmelding={visFeilmelding}
                />
            </form>
        </Panel>
    );
};

export default BestattUtdanning;
