import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SporsmalId, TilbakeIArbeid, hentTekst } from '../../model/sporsmal';

const TilbakeTilJobb = (props: SkjemaKomponentProps<TilbakeIArbeid>) => {
    const sprak = useSprak();
    const tekst = (key: string) => hentTekst(sprak, key);
    const { onChange, valgt } = props;

    const lagValg = (valg: TilbakeIArbeid) => ({ tekst: tekst(valg), value: valg });
    const valg = [
        lagValg(TilbakeIArbeid.JA_FULL_STILLING),
        lagValg(TilbakeIArbeid.JA_REDUSERT_STILLING),
        lagValg(TilbakeIArbeid.USIKKER),
        lagValg(TilbakeIArbeid.NEI),
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst(SporsmalId.tilbakeIArbeid)}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={(val) => onChange(val)} valgt={valgt} />
            </form>
        </>
    );
};

export default TilbakeTilJobb;
