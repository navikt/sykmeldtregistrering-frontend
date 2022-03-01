import { Cell, Grid, Radio, RadioGroup } from '@navikt/ds-react';

interface RadioGruppeProps {
    valg: {
        tekst: string;
        value: string;
    }[];
    onSelect?: (val: any) => void;
    valgt?: string;
}

const RadioGruppe = (props: RadioGruppeProps) => {
    const { valg, onSelect, valgt } = props;
    return (
        <RadioGroup defaultValue={valgt} legend="" onChange={onSelect}>
            <Grid>
                {valg.map((alternativ) => {
                    return (
                        <Cell key={alternativ.value} xs={12} md={6}>
                            <Radio value={alternativ.value}>{alternativ.tekst}</Radio>
                        </Cell>
                    );
                })}
            </Grid>
        </RadioGroup>
    );
};

export default RadioGruppe;
