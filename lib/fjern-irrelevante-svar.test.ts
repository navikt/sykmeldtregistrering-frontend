import { JaEllerNei, SkjemaState } from '../model/skjema';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { oppdaterDinSituasjon, oppdaterUtdanning } from './skjema-state';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';

describe('Oppdatering av skjemastate', () => {
    test('setter sisteJobb til undefined hvis man endrer dinSituasjon til ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: { verdi: Jobbsituasjon.MISTETJOBB, tekst: '' },
            sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
        };
        const oppdatertState = oppdaterDinSituasjon(state, { verdi: Jobbsituasjon.ALDRIJOBBET, tekst: '' });

        expect(oppdatertState.sisteStilling).toBe(undefined);
    });
    test('lar sisteJobb-verdien bli stående hvis man endrer dinSituasjon til noe annet enn ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: { verdi: Jobbsituasjon.MISTETJOBB, tekst: '' },
            sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
        };
        const oppdatertState = oppdaterDinSituasjon(state, { verdi: Jobbsituasjon.DELTID, tekst: '' });

        expect(oppdatertState.sisteStilling).toEqual({ verdi: 'Kokk', tekst: 'Kokk' });
    });
    test('setter godkjentUtdanning og bestaattUtdanning til undefined hvis man endrer utdanning til INGEN', () => {
        const state: SkjemaState = {
            utdanning: { verdi: Utdanningsnivaa.HOYERE, tekst: '' },
            utdanningGodkjent: { verdi: GodkjentUtdanningValg.JA, tekst: '' },
            utdanningBestatt: { verdi: JaEllerNei.JA, tekst: '' },
        };
        const oppdatertState = oppdaterUtdanning(state, { verdi: Utdanningsnivaa.INGEN, tekst: '' });

        expect(oppdatertState.utdanningBestatt).toBe(undefined);
        expect(oppdatertState.utdanningGodkjent).toBe(undefined);
    });
    test('lar godkjentUtdanning og bestaattUtdanning bli stående hvis utdanning endres til annet enn INGEN', () => {
        const state: SkjemaState = {
            utdanning: { verdi: Utdanningsnivaa.HOYERE, tekst: '' },
            utdanningGodkjent: { verdi: GodkjentUtdanningValg.JA, tekst: '' },
            utdanningBestatt: { verdi: JaEllerNei.JA, tekst: '' },
        };
        const oppdatertState = oppdaterUtdanning(state, { verdi: Utdanningsnivaa.GRUNNSKOLE, tekst: '' });

        expect(oppdatertState.utdanningGodkjent).toEqual({ verdi: GodkjentUtdanningValg.JA, tekst: '' });
        expect(oppdatertState.utdanningBestatt).toEqual({ verdi: JaEllerNei.JA, tekst: '' });
    });
});
