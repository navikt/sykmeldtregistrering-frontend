import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva er din høyeste fullførte utdanning?',
        INGEN_UTDANNING: 'Ingen utdanning',
        GRUNNSKOLE: 'Grunnskole',
        VIDEREGAENDE_GRUNNUTDANNING: 'Videregående grunnutdanning (1 til 2 år)',
        VIDEREGAENDE_FAGBREV_SVENNEBREV: 'Videregående, fagbrev eller svennebrev (3 år eller mer)',
        HOYERE_UTDANNING_1_TIL_4: 'Høyere utdanning (1 til 4 år)',
        HOYERE_UTDANNING_5_ELLER_MER: 'Høyere utdanning (5 år eller mer)',
    },
};

export enum Utdanningsnivaa {
    INGEN_UTDANNING = 'INGEN_UTDANNING',
    GRUNNSKOLE = 'GRUNNSKOLE',
    VIDEREGAENDE_GRUNNUTDANNING = 'VIDEREGAENDE_GRUNNUTDANNING',
    VIDEREGAENDE_FAGBREV_SVENNEBREV = 'VIDEREGAENDE_FAGBREV_SVENNEBREV',
    HOYERE_UTDANNING_1_TIL_4 = 'HOYERE_UTDANNING_1_TIL_4',
    HOYERE_UTDANNING_5_ELLER_MER = 'HOYERE_UTDANNING_5_ELLER_MER',
}

const Utdanning = (props: SkjemaKomponentProps<Utdanningsnivaa>) => {
    const { onChange, valgt } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst(Utdanningsnivaa.INGEN_UTDANNING), value: Utdanningsnivaa.INGEN_UTDANNING },
        { tekst: tekst(Utdanningsnivaa.GRUNNSKOLE), value: Utdanningsnivaa.GRUNNSKOLE },
        {
            tekst: tekst(Utdanningsnivaa.VIDEREGAENDE_GRUNNUTDANNING),
            value: Utdanningsnivaa.VIDEREGAENDE_GRUNNUTDANNING,
        },
        {
            tekst: tekst(Utdanningsnivaa.VIDEREGAENDE_FAGBREV_SVENNEBREV),
            value: Utdanningsnivaa.VIDEREGAENDE_FAGBREV_SVENNEBREV,
        },
        { tekst: tekst(Utdanningsnivaa.HOYERE_UTDANNING_1_TIL_4), value: Utdanningsnivaa.HOYERE_UTDANNING_1_TIL_4 },
        {
            tekst: tekst(Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER),
            value: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER,
        },
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

export default Utdanning;
