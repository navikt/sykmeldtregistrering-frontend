import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva er din høyeste fullførte utdanning?',
        ingen: 'Ingen utdanning',
        grunnskole: 'Grunnskole',
        vgs: 'Videregående grunnutdanning (1 til 2 år)',
        vgsFagbrev: 'Videregående, fagbrev eller svennebrev (3 år eller mer)',
        hoyere: 'Høyere utdanning (1 til 4 år)',
        hoyere5: 'Høyere utdanning (5 år eller mer)',
    },
};

export enum Utdanningsnivaa {
    INGEN_UTDANNING = 'ingen',
    GRUNNSKOLE = 'grunnskole',
    VIDEREGAENDE_GRUNNUTDANNING = 'vgs',
    VIDEREGAENDE_FAGBREV_SVENNEBREV = 'vgsFagbrev',
    HOYERE_UTDANNING_1_TIL_4 = 'hoyere',
    HOYERE_UTDANNING_5_ELLER_MER = 'hoyere5',
}

const Utdanning = (props: SkjemaKomponentProps<Utdanningsnivaa>) => {
    const { onChange, valgt } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: tekst('ingen'), value: Utdanningsnivaa.INGEN_UTDANNING.valueOf() },
        { tekst: tekst('grunnskole'), value: Utdanningsnivaa.GRUNNSKOLE.valueOf() },
        { tekst: tekst('vgs'), value: Utdanningsnivaa.VIDEREGAENDE_GRUNNUTDANNING.valueOf() },
        { tekst: tekst('vgsFagbrev'), value: Utdanningsnivaa.VIDEREGAENDE_FAGBREV_SVENNEBREV.valueOf() },
        { tekst: tekst('hoyere'), value: Utdanningsnivaa.HOYERE_UTDANNING_1_TIL_4.valueOf() },
        { tekst: tekst('hoyere5'), value: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER.valueOf() },
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
