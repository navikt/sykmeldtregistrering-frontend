import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import { Navigering, SkjemaSide, SkjemaState, StandardSkjemaSide } from '../model/skjema';
import { Dispatch, useReducer, useState } from 'react';
import { SkjemaAction, skjemaReducer, SkjemaReducer } from '../lib/skjema-state';
import { NextPage } from 'next';
import useSprak from '../hooks/useSprak';
import { useRouter } from 'next/router';
import styles from '../styles/skjema.module.css';
import TilbakeKnapp from './skjema/tilbake-knapp';
import { Alert } from '@navikt/ds-react';
import { Knapperad } from './skjema/knapperad/knapperad';
import Avbryt from './skjema/avbryt-lenke';

export type SiderMap = { [key: string]: JSX.Element };

export interface SkjemaProps {
    aktivSide: StandardSkjemaSide;
    isValid?: boolean;
}

interface LagSkjemaSideProps {
    TEKSTER: Tekster<string>;
    urlPrefix: string;
    validerSkjemaForSide: (side: StandardSkjemaSide, skjemaState: SkjemaState) => boolean;
    hentKomponentForSide: (side: SkjemaSide, skjemaState: SkjemaState, dispatch: Dispatch<SkjemaAction>) => JSX.Element;
    beregnNavigering: (aktivSide: StandardSkjemaSide, state: SkjemaState) => Navigering<SkjemaSide>;
}

export type SkjemaSideFactory = (opts: LagSkjemaSideProps) => NextPage<SkjemaProps>;

const skjemaSideFactory: SkjemaSideFactory = (opts) => {
    const { TEKSTER, beregnNavigering, urlPrefix, validerSkjemaForSide, hentKomponentForSide } = opts;

    const SkjemaSide = (props: SkjemaProps) => {
        const { aktivSide } = props;
        const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
        const router = useRouter();
        const initializer = (skjemaState: SkjemaState) => skjemaState;
        const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(skjemaReducer, {}, initializer);
        const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

        const { forrige, neste } = beregnNavigering(aktivSide, skjemaState);

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

        const forrigeLenke = forrige ? `/${urlPrefix}/${forrige}` : undefined;

        return (
            <>
                <main className={styles.main}>
                    {forrigeLenke && <TilbakeKnapp href={forrigeLenke} />}
                    {hentKomponentForSide(aktivSide, skjemaState, dispatch)}
                    {visFeilmelding && <Alert variant="warning">{tekst('advarsel')}</Alert>}
                    <Knapperad onNeste={validerOgGaaTilNeste} />
                    <Avbryt />
                </main>
            </>
        );
    };

    return SkjemaSide;
};

export default skjemaSideFactory;
