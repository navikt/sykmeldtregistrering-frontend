import { Heading, Radio, RadioGroup } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

interface RadioGruppeProps {
    valg: {
        tekst: string;
        value: string;
    }[];
    onSelect?: (val: any) => void;
    valgt?: string;
    visFeilmelding?: boolean;
    legend?: string;
    beskrivelse?: string;
}

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
    },
    en: {
        advarsel: 'You will need to answer before you can continue.',
    },
};

const RadioGruppe = (props: RadioGruppeProps) => {
    const { valg, onSelect, valgt, visFeilmelding, legend, beskrivelse } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const error = visFeilmelding ? tekst('advarsel') : undefined;

    return (
        <>
            <Heading size="small" level="1">
                {legend}
            </Heading>
            <RadioGroup defaultValue={valgt} legend="" onChange={onSelect} error={error} description={beskrivelse}>
                {valg.map((alternativ) => {
                    return (
                        <Radio key={alternativ.value} value={alternativ.value}>
                            {alternativ.tekst}
                        </Radio>
                    );
                })}
            </RadioGroup>
        </>
    );
};

export default RadioGruppe;
