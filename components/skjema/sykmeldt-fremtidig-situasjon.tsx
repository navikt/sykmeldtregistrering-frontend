import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva tenker du om din fremtidige situasjon?',
        SAMME_ARBEIDSGIVER: 'Jeg skal tilbake til jobben jeg har',
        SAMME_ARBEIDSGIVER_NY_STILLING: 'Jeg skal tilbake til arbeidsgiveren min, men i ny stilling',
        NY_ARBEIDSGIVER: 'Jeg trenger ny jobb',
        USIKKER: 'Jeg er usikker',
        INGEN_PASSER: 'Ingen av disse alternativene passer',
    },
};

export enum FremtidigSituasjon {
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    USIKKER = 'USIKKER',
    INGEN_PASSER = 'INGEN_PASSER',
}

const SykmeldtFremtidigSituasjon = (props: SkjemaKomponentProps<FremtidigSituasjon>) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
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
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe
                    valg={valg}
                    onSelect={(val) => onChange({ verdi: val, tekst: tekst(val) })}
                    valgt={valgt}
                />
            </form>
        </>
    );
};

export default SykmeldtFremtidigSituasjon;
