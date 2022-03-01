import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Er utdanningen din godkjent i Norge?',
        ja: 'Ja',
        nei: 'Nei',
        vetIkke: 'Vet ikke',
    },
};

export enum GodkjentUtdanningValg {
    JA = 'ja',
    NEI = 'nei',
    VET_IKKE = 'vetIkke',
}

const GodkjentUtdanning = (props: SkjemaKomponentProps<GodkjentUtdanningValg>) => {
    const { onChange, valgt } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const lagValg = (valg: GodkjentUtdanningValg) => ({ tekst: tekst(valg), value: valg });
    const valg = [
        lagValg(GodkjentUtdanningValg.JA),
        lagValg(GodkjentUtdanningValg.NEI),
        lagValg(GodkjentUtdanningValg.VET_IKKE),
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={onChange} valgt={valgt} />
            </form>
        </>
    );
};

export default GodkjentUtdanning;
