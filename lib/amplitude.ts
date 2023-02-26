import amplitude from 'amplitude-js';

import { Brukergruppe, RegistreringType } from '../model/registrering';
import { DinSituasjon, SporsmalId } from '../model/sporsmal';
import { ErrorTypes } from '../model/error';

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

type EventData = SidevisningData | AktivitetData | StoppsituasjonData | BesvarelseData | EksperimentData;

type BesvarelseData = { skjematype: 'standard' | 'sykmeldt'; sporsmalId: SporsmalId; svar: any };

type StoppsituasjonData = { situasjon: string; brukergruppe?: Brukergruppe; aarsak?: ErrorTypes };

type SidevisningData = { sidetittel: string };

type AktivitetData =
    | { aktivitet: KvitteringAktivitet; registreringstype: RegistreringType }
    | {
          aktivitet: 'Utfylling av skjema fullført';
          tidBruktForAaFullforeSkjema?: number;
          registreringstype: RegistreringType;
          innsatsgruppe?: string;
      }
    | { aktivitet: 'Start registrering'; registreringstype: RegistreringType }
    | { aktivitet: 'Går til start registrering' }
    | { aktivitet: 'Avbryter registreringen' }
    | { aktivitet: 'Arbeidssøkeren reaktiverer seg'; brukergruppe: Brukergruppe }
    | { aktivitet: 'Arbeidssøkeren avslår reaktivering'; brukergruppe: Brukergruppe }
    | { aktivitet: 'Fortsetter til sykmeldtregistrering' }
    | { aktivitet: 'Oppretter kontakt meg oppgave' }
    | { aktivitet: 'Avbryter kontakt meg' }
    | { aktivitet: 'Endrer foreslått stilling' }
    | { aktivitet: 'Viser forsiden for arbeidssøkerregistreringen' }
    | { aktivitet: 'Leser om bistandsbehov' }
    | { aktivitet: 'Leser om personopplysninger' };

type KvitteringAktivitet =
    | 'Viser kvittering'
    | 'Går til dagpenger fra kvittering'
    | 'Velger å ikke gå til dagpenger fra kvittering'
    | 'Velger å lese mer om økonomisk støtte'
    | 'Velger å ikke søke om økonomisk støtte';

type EksperimentData = {
    eksperiment: 'Videresender til AiA';
    innsatsgruppe: string;
    situasjon?: DinSituasjon;
};

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

export function loggEksperiment(data: EksperimentData) {
    const eventData = data || {};
    logAmplitudeEvent('arbeidssokerregistrering.eksperimenter', eventData);
}
