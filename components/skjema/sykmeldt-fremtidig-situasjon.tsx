import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { FremtidigSituasjon, hentTekst, SporsmalId } from '../../model/sporsmal';

const SykmeldtFremtidigSituasjon = (props: SkjemaKomponentProps<FremtidigSituasjon>) => {
    const sprak = useSprak();
    const tekst = (key: string) => hentTekst(sprak, key);
    const { onChange, valgt } = props;

    const lagValg = (valg: FremtidigSituasjon) => ({ tekst: tekst(valg), value: valg });
    const valg = [
        lagValg(FremtidigSituasjon.SAMME_ARBEIDSGIVER),
        lagValg(FremtidigSituasjon.SAMME_ARBEIDSGIVER_NY_STILLING),
        lagValg(FremtidigSituasjon.NY_ARBEIDSGIVER),
        lagValg(FremtidigSituasjon.USIKKER),
        lagValg(FremtidigSituasjon.INGEN_PASSER),
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst(SporsmalId.fremtidigSituasjon)}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={(val) => onChange(val)} valgt={valgt} />
            </form>
        </>
    );
};

export default SykmeldtFremtidigSituasjon;
