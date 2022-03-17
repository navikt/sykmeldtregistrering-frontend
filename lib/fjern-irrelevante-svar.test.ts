import { SkjemaState } from '../model/skjema';
import { oppdaterDinSituasjon, oppdaterUtdanning } from './skjema-state';
import { DinSituasjon, UtdanningGodkjentValg, JaEllerNei, Utdanningsnivaa } from '../model/sporsmal';

const sisteStilling = {
    label: 'Klovn kommunal sektor',
    styrk08: ['5411'],
    konseptId: 45779,
};

describe('Oppdatering av skjemastate', () => {
    test('setter sisteJobb til undefined hvis man endrer dinSituasjon til ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: DinSituasjon.MISTET_JOBBEN,
            sisteStilling: sisteStilling,
        };
        const oppdatertState = oppdaterDinSituasjon(state, DinSituasjon.ALDRI_HATT_JOBB);

        expect(oppdatertState.sisteStilling).toBe(undefined);
    });
    test('lar sisteJobb-verdien bli stående hvis man endrer dinSituasjon til noe annet enn ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: DinSituasjon.MISTET_JOBBEN,
            sisteStilling: sisteStilling,
        };
        const oppdatertState = oppdaterDinSituasjon(state, DinSituasjon.DELTIDSJOBB_VIL_MER);

        expect(oppdatertState.sisteStilling).toEqual(sisteStilling);
    });
    test('setter godkjentUtdanning og bestaattUtdanning til undefined hvis man endrer utdanning til INGEN', () => {
        const state: SkjemaState = {
            utdanning: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER,
            utdanningGodkjent: UtdanningGodkjentValg.JA,
            utdanningBestatt: JaEllerNei.JA,
        };
        const oppdatertState = oppdaterUtdanning(state, Utdanningsnivaa.INGEN_UTDANNING);

        expect(oppdatertState.utdanningBestatt).toBe(undefined);
        expect(oppdatertState.utdanningGodkjent).toBe(undefined);
    });
    test('lar godkjentUtdanning og bestaattUtdanning bli stående hvis utdanning endres til annet enn INGEN', () => {
        const state: SkjemaState = {
            utdanning: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER,
            utdanningGodkjent: UtdanningGodkjentValg.JA,
            utdanningBestatt: JaEllerNei.JA,
        };
        const oppdatertState = oppdaterUtdanning(state, Utdanningsnivaa.GRUNNSKOLE);

        expect(oppdatertState.utdanningGodkjent).toEqual(UtdanningGodkjentValg.JA);
        expect(oppdatertState.utdanningBestatt).toEqual(JaEllerNei.JA);
    });
});
