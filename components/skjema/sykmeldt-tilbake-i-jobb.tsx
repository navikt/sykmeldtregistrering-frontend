import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import { hentTekst, SporsmalId, TilbakeIArbeid } from '../../model/sporsmal';

const TilbakeIJobb = (props: SkjemaKomponentProps<string>) => {
    const sprak = useSprak();
    const tekst = (key: string) => hentTekst(sprak, key);
    const { onChange, valgt } = props;

    const valg = [
        { tekst: tekst('jaFullStilling'), value: TilbakeIArbeid.JA_FULL_STILLING },
        { tekst: tekst('jaRedusertStilling'), value: TilbakeIArbeid.JA_REDUSERT_STILLING },
        { tekst: tekst('usikker'), value: TilbakeIArbeid.USIKKER },
        { tekst: tekst('nei'), value: TilbakeIArbeid.NEI },
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

export default TilbakeIJobb;
