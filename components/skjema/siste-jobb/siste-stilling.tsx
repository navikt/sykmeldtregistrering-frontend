import RadioGruppe from '../../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from '../skjema-felleskomponenter';
import { hentTekst, SisteStillingValg } from '../../../model/sporsmal';
import useSprak from '../../../hooks/useSprak';

const SisteStilling = (props: SkjemaKomponentProps<SisteStillingValg>) => {
    const { onChange } = props;
    let sprak = useSprak();

    const valg = [
        { tekst: hentTekst(sprak, SisteStillingValg.HAR_HATT_JOBB), value: SisteStillingValg.HAR_HATT_JOBB },
        { tekst: hentTekst(sprak, SisteStillingValg.HAR_IKKE_HATT_JOBB), value: SisteStillingValg.HAR_IKKE_HATT_JOBB },
    ];

    return <RadioGruppe valg={valg} valgt={props.valgt} onSelect={(val) => onChange(val)} />;
};

export default SisteStilling;
