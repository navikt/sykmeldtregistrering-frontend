import { SkjemaState } from '../model/skjema';
import { oppdaterDinSituasjon, oppdaterUtdanning } from './skjema-state';
import { DinSituasjon, UtdanningGodkjentValg, JaEllerNei, Utdanningsnivaa } from '../model/sporsmal';

describe('Oppdatering av skjemastate', () => {
    test('setter sisteJobb til undefined hvis man endrer dinSituasjon til ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
            sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
        };
        const oppdatertState = oppdaterDinSituasjon(state, { verdi: DinSituasjon.ALDRI_HATT_JOBB, tekst: '' });

        expect(oppdatertState.sisteStilling).toBe(undefined);
    });
    test('lar sisteJobb-verdien bli stående hvis man endrer dinSituasjon til noe annet enn ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
            sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
        };
        const oppdatertState = oppdaterDinSituasjon(state, { verdi: DinSituasjon.DELTIDSJOBB_VIL_MER, tekst: '' });

        expect(oppdatertState.sisteStilling).toEqual({ verdi: 'Kokk', tekst: 'Kokk' });
    });
    test('setter godkjentUtdanning og bestaattUtdanning til undefined hvis man endrer utdanning til INGEN', () => {
        const state: SkjemaState = {
            utdanning: { verdi: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER, tekst: '' },
            utdanningGodkjent: { verdi: UtdanningGodkjentValg.JA, tekst: '' },
            utdanningBestatt: { verdi: JaEllerNei.JA, tekst: '' },
        };
        const oppdatertState = oppdaterUtdanning(state, { verdi: Utdanningsnivaa.INGEN_UTDANNING, tekst: '' });

        expect(oppdatertState.utdanningBestatt).toBe(undefined);
        expect(oppdatertState.utdanningGodkjent).toBe(undefined);
    });
    test('lar godkjentUtdanning og bestaattUtdanning bli stående hvis utdanning endres til annet enn INGEN', () => {
        const state: SkjemaState = {
            utdanning: { verdi: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER, tekst: '' },
            utdanningGodkjent: { verdi: UtdanningGodkjentValg.JA, tekst: '' },
            utdanningBestatt: { verdi: JaEllerNei.JA, tekst: '' },
        };
        const oppdatertState = oppdaterUtdanning(state, { verdi: Utdanningsnivaa.GRUNNSKOLE, tekst: '' });

        expect(oppdatertState.utdanningGodkjent).toEqual({ verdi: UtdanningGodkjentValg.JA, tekst: '' });
        expect(oppdatertState.utdanningBestatt).toEqual({ verdi: JaEllerNei.JA, tekst: '' });
    });
});
