import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SykmeldtValg } from './sykmeldt-fremtidig-situasjon';

export enum TilbakeTilJobbValg {
    FULL_STILLING = 'fullStilling',
    REDUSERT_STILLING = 'redusertStilling',
    USIKKER = 'usikker',
    NEI = 'nei',
}

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
        [TilbakeTilJobbValg.FULL_STILLING]: 'Ja, i full stilling',
        [TilbakeTilJobbValg.REDUSERT_STILLING]: 'Ja, i redusert stilling',
        [TilbakeTilJobbValg.USIKKER]: 'Usikker',
        [TilbakeTilJobbValg.NEI]: 'Nei',
    },
};

const TilbakeTilJobb = (props: SkjemaKomponentProps<TilbakeTilJobbValg>) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const { onChange, valgt } = props;

    const lagValg = (valg: TilbakeTilJobbValg) => ({ tekst: tekst(valg), value: valg });
    const valg = [
        lagValg(TilbakeTilJobbValg.FULL_STILLING),
        lagValg(TilbakeTilJobbValg.REDUSERT_STILLING),
        lagValg(TilbakeTilJobbValg.USIKKER),
        lagValg(TilbakeTilJobbValg.NEI),
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

export default TilbakeTilJobb;
