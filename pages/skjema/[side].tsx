import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/header';
import DinSituasjon, { Jobbsituasjon } from '../../components/skjema/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/skjema/siste-jobb/siste-jobb';
import Utdanning, { Utdanningsnivaa } from '../../components/skjema/utdanning';
import GodkjentUtdanning, { GodkjentUtdanningValg } from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Helseproblemer from '../../components/skjema/helseproblemer';
import AndreProblemer from '../../components/skjema/andre-problemer';
import { Reducer, useReducer, useState } from 'react';
import { Knapperad } from '../../components/skjema/knapperad/knapperad';
import Avbryt from '../../components/skjema/avbryt-lenke';
import { Alert } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import Oppsummering from '../../components/skjema/oppsummering/oppsummering';
import { beregnNavigering } from '../../lib/standard-registrering-tilstandsmaskin';
import { JaEllerNei, SkjemaState, StandardSkjemaSide } from '../../model/skjema';

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
    },
};

interface SkjemaProps {
    aktivSide: StandardSkjemaSide;
    isValid?: boolean;
}

type SiderMap = { [key: number]: JSX.Element };

type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
type SkjemaAction =
    | { type: StandardSkjemaSide.DinSituasjon; value: Jobbsituasjon }
    | { type: StandardSkjemaSide.Utdanning; value: Utdanningsnivaa }
    | { type: StandardSkjemaSide.GodkjentUtdanning; value: GodkjentUtdanningValg }
    | { type: StandardSkjemaSide.BestaattUtdanning; value: JaEllerNei }
    | { type: StandardSkjemaSide.Helseproblemer; value: JaEllerNei }
    | { type: StandardSkjemaSide.AndreProblemer; value: JaEllerNei }
    | { type: StandardSkjemaSide.SisteJobb; value: string };

function skjemaReducer(state: SkjemaState, action: SkjemaAction): SkjemaState {
    switch (action.type) {
        case StandardSkjemaSide.DinSituasjon: {
            return {
                ...state,
                dinSituasjon: action.value,
            };
        }
        case StandardSkjemaSide.Utdanning: {
            return {
                ...state,
                utdanning: action.value,
            };
        }

        case StandardSkjemaSide.SisteJobb: {
            return {
                ...state,
                sisteJobb: action.value,
            };
        }

        case StandardSkjemaSide.GodkjentUtdanning: {
            return {
                ...state,
                godkjentUtdanning: action.value,
            };
        }
        case StandardSkjemaSide.BestaattUtdanning: {
            return {
                ...state,
                bestaattUtdanning: action.value,
            };
        }
        case StandardSkjemaSide.Helseproblemer: {
            return {
                ...state,
                helseproblemer: action.value,
            };
        }
        case StandardSkjemaSide.AndreProblemer: {
            return {
                ...state,
                andreProblemer: action.value,
            };
        }
    }

    return state;
}

const initializer = (skjemaState: SkjemaState) => skjemaState;

const Skjema: NextPage<SkjemaProps> = (props) => {
    const validerSkjemaForSide = (side: StandardSkjemaSide) => {
        const hentVerdi = () => {
            switch (side) {
                case StandardSkjemaSide.DinSituasjon:
                    return skjemaState.dinSituasjon;
                case StandardSkjemaSide.SisteJobb:
                    return skjemaState.sisteJobb;
                case StandardSkjemaSide.Utdanning:
                    return skjemaState.utdanning;
                case StandardSkjemaSide.GodkjentUtdanning:
                    return skjemaState.godkjentUtdanning;
                case StandardSkjemaSide.BestaattUtdanning:
                    return skjemaState.bestaattUtdanning;
                case StandardSkjemaSide.Helseproblemer:
                    return skjemaState.helseproblemer;
                case StandardSkjemaSide.AndreProblemer:
                    return skjemaState.andreProblemer;
            }
        };

        return Boolean(hentVerdi());
    };

    const { aktivSide } = props;
    const router = useRouter();
    const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(skjemaReducer, {}, initializer);
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const siderMap: SiderMap = {
        [StandardSkjemaSide.DinSituasjon]: (
            <DinSituasjon
                onChange={(value) => dispatch({ type: StandardSkjemaSide.DinSituasjon, value })}
                valgt={skjemaState.dinSituasjon}
            />
        ),
        [StandardSkjemaSide.SisteJobb]: (
            <SisteJobb
                onChange={(value) => dispatch({ type: StandardSkjemaSide.SisteJobb, value })}
                valgt={skjemaState.sisteJobb}
            />
        ),
        [StandardSkjemaSide.Utdanning]: (
            <Utdanning
                onChange={(value) => dispatch({ type: StandardSkjemaSide.Utdanning, value })}
                valgt={skjemaState.utdanning}
            />
        ),
        [StandardSkjemaSide.GodkjentUtdanning]: (
            <GodkjentUtdanning
                onChange={(value) => dispatch({ type: StandardSkjemaSide.GodkjentUtdanning, value })}
                valgt={skjemaState.godkjentUtdanning}
            />
        ),
        [StandardSkjemaSide.BestaattUtdanning]: (
            <BestattUtdanning
                onChange={(value) => dispatch({ type: StandardSkjemaSide.BestaattUtdanning, value })}
                valgt={skjemaState.bestaattUtdanning}
            />
        ),
        [StandardSkjemaSide.Helseproblemer]: (
            <Helseproblemer
                onChange={(value) => dispatch({ type: StandardSkjemaSide.Helseproblemer, value })}
                valgt={skjemaState.helseproblemer}
            />
        ),
        [StandardSkjemaSide.AndreProblemer]: (
            <AndreProblemer
                onChange={(value) => dispatch({ type: StandardSkjemaSide.AndreProblemer, value })}
                valgt={skjemaState.andreProblemer}
            />
        ),
        [StandardSkjemaSide.Oppsummering]: <Oppsummering {...skjemaState} />,
        // '9': (
        //     <SykmeldtFremtidigSituasjon
        //         onChange={(value) => dispatch({ type: StandardSkjemaSide.SykmeldtFremtidigSituasjon, value })}
        //         valgt={skjemaState.sykmeldtFremtidigSituasjon}
        //     />
        // ),
    };

    const hentKomponentForSide = (side: StandardSkjemaSide) =>
        siderMap[side] || siderMap[StandardSkjemaSide.DinSituasjon];

    const { forrige, neste } = beregnNavigering(aktivSide, skjemaState);

    const navigerTilSide = (side: StandardSkjemaSide) => {
        return router.push(`/skjema/${side}`);
    };

    const validerOgGaaTilNeste = () => {
        if (!validerSkjemaForSide(aktivSide)) {
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
            <Header />
            <main className={styles.main}>
                {hentKomponentForSide(aktivSide)}
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
