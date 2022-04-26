import { RegistreringType } from '../model/registrering';
import { loggAktivitet as loggAktivitetJs } from './amplitude';

type AktivitetData =
    | { aktivitet: KvitteringAktivitet; registreringstype: RegistreringType }
    | { aktivitet: 'Utfylling av skjema fullført'; tidBruktForAaFullforeSkjema?: number }
    | { aktivitet: 'Avbryter registreringen'; registreringstype?: any }
    | { aktivitet: 'Start registrering'; registreringstype?: any };

type KvitteringAktivitet =
    | 'Viser kvittering'
    | 'Går til dagpenger fra kvittering'
    | 'Velger å ikke gå til dagpenger fra kvittering'
    | 'Velger å lese mer om økonomisk støtte'
    | 'Velger å ikke søke om økonomisk støtte';

export function loggAktivitet(data: AktivitetData) {
    loggAktivitetJs(data);
}
