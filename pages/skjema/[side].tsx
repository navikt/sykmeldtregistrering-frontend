import { NextPage } from 'next';
import { useRouter } from 'next/router';
import DinSituasjon, { Jobbsituasjon } from '../../components/skjema/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/skjema/siste-jobb/siste-jobb';
import Utdanning, { Utdanningsnivaa } from '../../components/skjema/utdanning';
import GodkjentUtdanning, { GodkjentUtdanningValg } from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Helseproblemer from '../../components/skjema/helseproblemer';
import AndreProblemer from '../../components/skjema/andre-problemer';
import { Dispatch, useReducer, useState } from 'react';
import { Knapperad } from '../../components/skjema/knapperad/knapperad';
import Avbryt from '../../components/skjema/avbryt-lenke';
import { Alert } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import Oppsummering from '../../components/skjema/oppsummering/oppsummering';
import { beregnNavigering } from '../../lib/standard-registrering-tilstandsmaskin';
import { JaEllerNei, SkjemaSide, SkjemaState, SkjemaVerdi, StandardSkjemaSide } from '../../model/skjema';
import { SkjemaAction, skjemaReducer, SkjemaReducer } from '../../lib/standard-skjema-state';

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
    },
};

interface SkjemaProps {
    aktivSide: StandardSkjemaSide;
    isValid?: boolean;
}

type SiderMap = { [key: string]: JSX.Element };

const initializer = (skjemaState: SkjemaState) => skjemaState;

const lagSiderMap = (skjemaState: SkjemaState, dispatch: Dispatch<SkjemaAction>): SiderMap => {
    return {
        [SkjemaSide.DinSituasjon]: (
            <DinSituasjon
                onChange={(value) =>
                    dispatch({ type: SkjemaSide.DinSituasjon, value: value as SkjemaVerdi<Jobbsituasjon> })
                }
                valgt={skjemaState.dinSituasjon?.verdi}
            />
        ),
        [SkjemaSide.SisteJobb]: (
            <SisteJobb
                onChange={(value) => dispatch({ type: SkjemaSide.SisteJobb, value: value as SkjemaVerdi<string> })}
                valgt={skjemaState.sisteJobb?.verdi}
            />
        ),
        [SkjemaSide.Utdanning]: (
            <Utdanning
                onChange={(value) =>
                    dispatch({ type: SkjemaSide.Utdanning, value: value as SkjemaVerdi<Utdanningsnivaa> })
                }
                valgt={skjemaState.utdanning?.verdi}
            />
        ),
        [SkjemaSide.GodkjentUtdanning]: (
            <GodkjentUtdanning
                onChange={(value) =>
                    dispatch({ type: SkjemaSide.GodkjentUtdanning, value: value as SkjemaVerdi<GodkjentUtdanningValg> })
                }
                valgt={skjemaState.godkjentUtdanning?.verdi}
            />
        ),
        [SkjemaSide.BestaattUtdanning]: (
            <BestattUtdanning
                onChange={(value) =>
                    dispatch({ type: SkjemaSide.BestaattUtdanning, value: value as SkjemaVerdi<JaEllerNei> })
                }
                valgt={skjemaState.bestaattUtdanning?.verdi}
            />
        ),
        [SkjemaSide.Helseproblemer]: (
            <Helseproblemer
                onChange={(value) =>
                    dispatch({ type: SkjemaSide.Helseproblemer, value: value as SkjemaVerdi<JaEllerNei> })
                }
                valgt={skjemaState.helseproblemer?.verdi}
            />
        ),
        [SkjemaSide.AndreProblemer]: (
            <AndreProblemer
                onChange={(value) =>
                    dispatch({ type: SkjemaSide.AndreProblemer, value: value as SkjemaVerdi<JaEllerNei> })
                }
                valgt={skjemaState.andreProblemer?.verdi}
            />
        ),
        [SkjemaSide.Oppsummering]: <Oppsummering {...skjemaState} skjemaPrefix={'/skjema/'} />,
    };
};

const validerSkjemaForSide = (side: StandardSkjemaSide, skjemaState: SkjemaState) => {
    const hentVerdi = () => {
        switch (side) {
            case SkjemaSide.DinSituasjon:
                return skjemaState.dinSituasjon;
            case SkjemaSide.SisteJobb:
                return skjemaState.sisteJobb;
            case SkjemaSide.Utdanning:
                return skjemaState.utdanning;
            case SkjemaSide.GodkjentUtdanning:
                return skjemaState.godkjentUtdanning;
            case SkjemaSide.BestaattUtdanning:
                return skjemaState.bestaattUtdanning;
            case SkjemaSide.Helseproblemer:
                return skjemaState.helseproblemer;
            case SkjemaSide.AndreProblemer:
                return skjemaState.andreProblemer;
        }
    };

    return Boolean(hentVerdi());
};

const hentKomponentForSide = (side: StandardSkjemaSide, siderMap: SiderMap) =>
    siderMap[side] || siderMap[SkjemaSide.DinSituasjon];

const Skjema: NextPage<SkjemaProps> = (props) => {
    const { aktivSide } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();

    const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(skjemaReducer, {}, initializer);
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    const { forrige, neste } = beregnNavigering(aktivSide, skjemaState);

    const navigerTilSide = (side: StandardSkjemaSide) => {
        return router.push(`/skjema/${side}`);
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

    const onForrige = forrige ? () => navigerTilSide(forrige) : undefined;

    return (
        <>
            <main className={styles.main}>
                {hentKomponentForSide(aktivSide, lagSiderMap(skjemaState, dispatch))}
                {visFeilmelding && <Alert variant="warning">{tekst('advarsel')}</Alert>}
                <Knapperad onNeste={validerOgGaaTilNeste} onForrige={onForrige} />
                <Avbryt />
            </main>
        </>
    );
};

Skjema.getInitialProps = async (context: any) => {
    const { side } = context.query;

    return {
        aktivSide: side,
    };
};

export default Skjema;
