import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { Button, Cell, Grid, Heading, Link, Radio, RadioGroup } from '@navikt/ds-react';
import useSprak from '../../hooks/useSprak';
import skjemaStyles from '../../styles/skjema.module.css';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Velg den situasjonen som passer deg best',
        mistet: 'Har mistet eller kommer til å miste jobben',
        sagtOpp: 'Har sagt opp eller kommer til å si opp',
        deltid: 'Har deltidsjobb, men vil jobbe mer',
        aldriJobbet: 'Har aldri vært i jobb',
        vilBytte: 'Har jobb, men vil bytte',
        ikkeSisteToAar: 'Har ikke vært i jobb de siste 2 årene',
        permitert: 'Er permittert eller kommer til å bli permittert',
        usikker: 'Er usikker på jobbsituasjonen min',
        fullfortUtdanning: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
        harJobb: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
    },
};
const DinSituasjon = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const valg = [
        { tekst: 'mistet', value: '' },
        { tekst: 'sagtOpp', value: '' },
        { tekst: 'deltid', value: '' },
        { tekst: 'aldriJobbet', value: '' },
        { tekst: 'vilBytte', value: '' },
        { tekst: 'ikkeSisteToAar', value: '' },
        { tekst: 'permitert', value: '' },
        { tekst: 'usikker', value: '' },
        { tekst: 'fullfortUtdanning', value: '' },
        { tekst: 'harJobb', value: '' },
    ];

    return (
        <>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>

            <form className="mbl">
                <RadioGroup legend="">
                    <Grid>
                        {valg.map((alternativ) => {
                            return (
                                <Cell key={alternativ.tekst} xs={12} md={6}>
                                    <Radio value={alternativ.tekst}>{tekst(alternativ.tekst)}</Radio>
                                </Cell>
                            );
                        })}
                    </Grid>
                </RadioGroup>
            </form>

            <div className={skjemaStyles.taCenter}>
                <Button>Neste</Button>
            </div>
            <div className={skjemaStyles.taCenter}>
                <Link href="#">Avbryt registreringen</Link>
            </div>
        </>
    );
};

export default DinSituasjon;
