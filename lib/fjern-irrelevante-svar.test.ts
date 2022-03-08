import { JaEllerNei, SkjemaState } from '../model/skjema';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { oppdaterDinSituasjon, oppdaterUtdanning } from './skjema-state';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';

describe('Oppdatering av skjemastate', () => {
    test('setter sisteJobb til undefined hvis man endrer dinSituasjon til ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: { verdi: Jobbsituasjon.MISTETJOBB, tekst: '' },
            sisteJobb: { verdi: 'Kokk', tekst: 'Kokk' },
        };
        const oppdatertState = oppdaterDinSituasjon(state, { verdi: Jobbsituasjon.ALDRIJOBBET, tekst: '' });

        expect(oppdatertState.sisteJobb).toBe(undefined);
    });
    test('lar sisteJobb-verdien bli stående hvis man endrer dinSituasjon til noe annet enn ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: { verdi: Jobbsituasjon.MISTETJOBB, tekst: '' },
            sisteJobb: { verdi: 'Kokk', tekst: 'Kokk' },
        };
        const oppdatertState = oppdaterDinSituasjon(state, { verdi: Jobbsituasjon.DELTID, tekst: '' });

        expect(oppdatertState.sisteJobb).toEqual({ verdi: 'Kokk', tekst: 'Kokk' });
    });
    test('setter godkjentUtdanning og bestaattUtdanning til undefined hvis man endrer utdanning til INGEN', () => {
        const state: SkjemaState = {
            utdanning: { verdi: Utdanningsnivaa.HOYERE, tekst: '' },
            godkjentUtdanning: { verdi: GodkjentUtdanningValg.JA, tekst: '' },
            bestaattUtdanning: { verdi: JaEllerNei.JA, tekst: '' },
        };
        const oppdatertState = oppdaterUtdanning(state, { verdi: Utdanningsnivaa.INGEN, tekst: '' });

        expect(oppdatertState.bestaattUtdanning).toBe(undefined);
        expect(oppdatertState.godkjentUtdanning).toBe(undefined);
    });
    test('lar godkjentUtdanning og bestaattUtdanning bli stående hvis utdanning endres til annet enn INGEN', () => {
        const state: SkjemaState = {
            utdanning: { verdi: Utdanningsnivaa.HOYERE, tekst: '' },
            godkjentUtdanning: { verdi: GodkjentUtdanningValg.JA, tekst: '' },
            bestaattUtdanning: { verdi: JaEllerNei.JA, tekst: '' },
        };
        const oppdatertState = oppdaterUtdanning(state, { verdi: Utdanningsnivaa.GRUNNSKOLE, tekst: '' });

        expect(oppdatertState.godkjentUtdanning).toEqual({ verdi: GodkjentUtdanningValg.JA, tekst: '' });
        expect(oppdatertState.bestaattUtdanning).toEqual({ verdi: JaEllerNei.JA, tekst: '' });
    });
});
