import { RegistreringType } from '../model/registrering';
import { loggAktivitet as loggAktivitetJs } from './amplitude';

type AktivitetData =
    | { aktivitet: KvitteringAktivitet; registreringstype: RegistreringType }
    | { aktivitet: 'Utfylling av skjema fullført'; tidBruktForAaFullforeSkjema?: number };

type KvitteringAktivitet =
    | 'Viser kvittering'
    | 'Går til dagpenger fra kvittering'
    | 'Velger å ikke gå til dagpenger fra kvittering';

export function loggAktivitet(data: AktivitetData) {
    loggAktivitetJs(data);
}
