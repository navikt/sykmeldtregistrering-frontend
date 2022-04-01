import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import { SkjemaSide, SkjemaState, StandardSkjemaSide, SykmeldtSkjemaSide } from '../model/skjema';
import { Dispatch, useEffect, useReducer, useState } from 'react';
import { SkjemaAction, skjemaReducer, SkjemaReducer } from '../lib/skjema-state';
import { NextPage } from 'next';
import useSprak from '../hooks/useSprak';
import { useRouter } from 'next/router';
import styles from '../styles/skjema.module.css';
import TilbakeKnapp from './skjema/tilbake-knapp';
import { Alert } from '@navikt/ds-react';
import { Knapperad } from './skjema/knapperad/knapperad';
import Avbryt from './skjema/avbryt-lenke';
import { SykmeldtRegistreringTilstandsmaskin } from '../lib/sykmeldt-registrering-tilstandsmaskin';
import { StandardRegistreringTilstandsmaskin } from '../lib/standard-registrering-tilstandsmaskin';

export type SiderMap = { [key: string]: JSX.Element };
export interface SkjemaProps {
    aktivSide: any;
}

export interface LagSkjemaSideProps {
    TEKSTER: Tekster<string>;
    urlPrefix: string;
    validerSkjemaForSide: (side: SkjemaSide, skjemaState: SkjemaState) => boolean;
    hentKomponentForSide: (side: SkjemaSide, skjemaState: SkjemaState, dispatch: Dispatch<SkjemaAction>) => JSX.Element;
    beregnNavigering: StandardRegistreringTilstandsmaskin | SykmeldtRegistreringTilstandsmaskin;
}

export type SkjemaSideFactory = (opts: LagSkjemaSideProps) => NextPage<SkjemaProps>;

const initialArgs = () => ({ startTid: Date.now() });
const skjemaSideFactory: SkjemaSideFactory = (opts) => {
    const { TEKSTER, beregnNavigering, urlPrefix, validerSkjemaForSide, hentKomponentForSide } = opts;

    const SkjemaSide = (props: SkjemaProps) => {
        const { aktivSide } = props;
        const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
        const router = useRouter();
        const initializer = (skjemaState: SkjemaState) => skjemaState;

        const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(
            skjemaReducer,
            initialArgs(),
            initializer
        );
        const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

        const { forrige, neste } = beregnNavigering(aktivSide, skjemaState);

        useEffect(() => {
            // valider at forrige side har gyldig state. Hvis ikke starter vi registrering på nytt
            if (forrige) {
                if (!validerSkjemaForSide(forrige, skjemaState)) {
                    router.push('/start/');
                }
            }
        }, [forrige, router, skjemaState]);

        const navigerTilSide = (side: SkjemaSide) => {
            return router.push(`/${urlPrefix}/${side}`);
        };

        const validerOgGaaTilNeste = () => {
            if (!validerSkjemaForSide(aktivSide, skjemaState)) {
                settVisFeilmelding(true);
                return;
            }

            settVisFeilmelding(false);

            if (neste) {
                return navigerTilSide(neste);
            }
        };

        useEffect(() => {
            if (validerSkjemaForSide(aktivSide, skjemaState)) {
                settVisFeilmelding(false);
            }
        }, [skjemaState, aktivSide]);

        const forrigeLenke = forrige ? `/${urlPrefix}/${forrige}` : undefined;

        return (
            <>
                <main className={styles.main}>
                    {forrigeLenke && <TilbakeKnapp href={forrigeLenke} />}
                    {hentKomponentForSide(aktivSide, skjemaState, dispatch)}
                    {visFeilmelding && <Alert variant="warning">{tekst('advarsel')}</Alert>}
                    {neste && <Knapperad onNeste={validerOgGaaTilNeste} />}
                    <Avbryt />
                </main>
            </>
        );
    };

    return SkjemaSide;
};

export default skjemaSideFactory;
