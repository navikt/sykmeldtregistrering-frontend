import amplitude from 'amplitude-js';

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

export const initAmplitude = ({ apiKey, apiEndpoint }) => {
    if (isBrowser()) {
        amplitude.getInstance().init(apiKey, undefined, { ...config, apiEndpoint });
        logAmplitudeEvent('sidevisning', {
            sidetittel: document.title,
        });
    }
};

export function logAmplitudeEvent(eventName, data) {
    return new Promise(function (resolve) {
        const eventData = data || {};
        if (isBrowser()) {
            amplitude.getInstance().logEvent(eventName, eventData, resolve);
        }
    });
}

export function loggStoppsituasjon(data) {
    const eventData = data || {};
    logAmplitudeEvent('arbeidssokerregistrering.stoppsituasjoner', eventData);
}

export function loggAktivitet(data) {
    const eventData = data || {};
    logAmplitudeEvent('arbeidssokerregistrering.aktiviteter', eventData);
}

export function loggBesvarelse(data) {
    const eventData = data || {};
    logAmplitudeEvent('arbeidssokerregistrering.besvarelser', eventData);
}
