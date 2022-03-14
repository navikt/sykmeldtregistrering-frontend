import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva tenker du om din fremtidige situasjon?',
        tilbakeTilJobb: 'Jeg skal tilbake til jobben jeg har',
        tilbakeTilNyStilling: 'Jeg skal tilbake til arbeidsgiveren min, men i ny stilling',
        trengerNyJobb: 'Jeg trenger ny jobb',
        usikker: 'Jeg er usikker',
        ingenAlternativerPasser: 'Ingen av disse alternativene passer',
    },
};

export enum FremtidigSituasjon {
    SAMME_ARBEIDSGIVER = 'tilbakeTilJobb',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'tilbakeTilNyStilling',
    NY_ARBEIDSGIVER = 'trengerNyJobb',
    USIKKER = 'usikker',
    INGEN_PASSER = 'ingenAlternativerPasser',
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
