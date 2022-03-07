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

export enum SykmeldtValg {
    TILBAKE_TIL_JOBB = 'tilbakeTilJobb',
    TILBAKE_TIL_NY_STILLING = 'tilbakeTilNyStilling',
    TRENGER_NY_JOBB = 'trengerNyJobb',
    USIKKER = 'usikker',
    INGEN_ALTERNATIVER_PASSER = 'ingenAlternativerPasser',
}

const SykmeldtFremtidigSituasjon = (props: SkjemaKomponentProps<SykmeldtValg>) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const { onChange, valgt } = props;

    const lagValg = (valg: SykmeldtValg) => ({ tekst: tekst(valg), value: valg });
    const valg = [
        lagValg(SykmeldtValg.TILBAKE_TIL_JOBB),
        lagValg(SykmeldtValg.TILBAKE_TIL_NY_STILLING),
        lagValg(SykmeldtValg.TRENGER_NY_JOBB),
        lagValg(SykmeldtValg.USIKKER),
        lagValg(SykmeldtValg.INGEN_ALTERNATIVER_PASSER),
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
