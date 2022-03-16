import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { Heading } from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import { SkjemaKomponentProps } from './skjema-felleskomponenter';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
        jaFullStilling: 'Ja, i full stilling',
        jaRedusertStilling: 'Ja, i redusert stilling',
        usikker: 'Usikker',
        nei: 'Nei',
    },
};

export enum TilbakeIArbeid {
    JA_FULL_STILLING = 'JA_FULL_STILLING',
    JA_REDUSERT_STILLING = 'JA_REDUSERT_STILLING',
    USIKKER = 'USIKKER',
    NEI = 'NEI',
}

const TilbakeIJobb = (props: SkjemaKomponentProps<string>) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
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
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGruppe valg={valg} onSelect={(val) => onChange(val)} valgt={valgt} />
            </form>
        </>
    );
};

export default TilbakeIJobb;
