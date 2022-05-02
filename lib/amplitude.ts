import amplitude from 'amplitude-js';
import { RegistreringType } from '../model/registrering';
import { SporsmalId } from '../model/sporsmal';

const isBrowser = () => typeof window !== 'undefined';

const config = {
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    trackingOptions: {
        city: false,
        ip_address: false,
    },
};

type EventData = SidevisningData | AktivitetData | StoppsituasjonData | BesvarelseData;

type BesvarelseData = { skjematype: 'standard' | 'sykmeldt'; sporsmalId: SporsmalId; svar: any };

type StoppsituasjonData = { situasjon: string };

type SidevisningData = { sidetittel: string };

type AktivitetData =
    | { aktivitet: KvitteringAktivitet; registreringstype: RegistreringType }
    | { aktivitet: 'Utfylling av skjema fullført'; tidBruktForAaFullforeSkjema?: number; registreringstype?: any }
    | { aktivitet: 'Start registrering'; registreringstype?: any }
    | { aktivitet: 'Går til start registrering'; registreringstype?: any }
    | { aktivitet: 'Avbryter registreringen'; registreringstype?: any }
    | { aktivitet: 'Arbeidssøkeren reaktiverer seg'; registreringstype?: any }
    | { aktivitet: 'Arbeidssøkeren avslår reaktivering'; registreringstype?: any }
    | { aktivitet: 'Fortsetter til sykmeldtregistrering'; registreringstype?: any }
    | { aktivitet: 'Oppretter kontakt meg oppgave'; registreringstype?: any }
    | { aktivitet: 'Avbryter kontakt meg'; registreringstype?: any };

type KvitteringAktivitet =
    | 'Viser kvittering'
    | 'Går til dagpenger fra kvittering'
    | 'Velger å ikke gå til dagpenger fra kvittering'
    | 'Velger å lese mer om økonomisk støtte'
    | 'Velger å ikke søke om økonomisk støtte';

type AmplitudeParams = { apiKey: string; apiEndpoint: string };
type AmplitudeInitFunction = (params: AmplitudeParams) => void;

export const initAmplitude: AmplitudeInitFunction = ({ apiKey, apiEndpoint }) => {
    if (isBrowser()) {
        amplitude.getInstance().init(apiKey, undefined, { ...config, apiEndpoint });
        logAmplitudeEvent('sidevisning', {
            sidetittel: document.title,
        });
    }
};

export function logAmplitudeEvent(eventName: string, data: EventData) {
    return new Promise(function (resolve) {
        const eventData = data || {};
        if (isBrowser()) {
            amplitude.getInstance().logEvent(eventName, eventData, resolve);
        }
    });
}

export function loggStoppsituasjon(data: StoppsituasjonData) {
    const eventData = data || {};
    logAmplitudeEvent('arbeidssokerregistrering.stoppsituasjoner', eventData);
}

export function loggAktivitet(data: AktivitetData) {
    const eventData = data || {};
    logAmplitudeEvent('arbeidssokerregistrering.aktiviteter', eventData);
}

export function loggBesvarelse(data: BesvarelseData) {
    const eventData = data || {};
    logAmplitudeEvent('arbeidssokerregistrering.besvarelser', eventData);
}
