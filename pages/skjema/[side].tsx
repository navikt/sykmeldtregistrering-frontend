import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/header';
import DinSituasjon, { Jobbsituasjon } from '../../components/skjema/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/skjema/siste-jobb/siste-jobb';
import Utdanning, { Utdanningsnivaa } from '../../components/skjema/utdanning';
import GodkjentUtdanning from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Helseproblemer from '../../components/skjema/helseproblemer';
import AndreProblemer from '../../components/skjema/andre-problemer';
import { Reducer, useEffect, useReducer, useState } from 'react';
import { Knapperad } from '../../components/skjema/knapperad/knapperad';
import Avbryt from '../../components/skjema/avbryt-lenke';
import { Alert } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import Oppsummering from '../../components/skjema/oppsummering/oppsummering';

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
    },
};

interface SkjemaProps {
    side: number;
    isValid?: boolean;
}

type SiderMap = { [key: number]: JSX.Element };

export interface SkjemaState {
    dinSituasjon?: string;
    sisteJobb?: string;
    utdanning?: string;
    godkjentUtdanning?: string;
    bestaattUtdanning?: string;
    helseproblemer?: string;
    andreProblemer?: string;
}

type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
type SkjemaAction = { type: ActionType; value: string };

enum ActionType {
    DinSituasjon,
    SisteJobb,
    Utdanning,
    GodkjentUtdanning,
    BestaattUtdanning,
    Helseproblemer,
    AndreProblemer,
}

function skjemaReducer(state: SkjemaState, action: SkjemaAction): SkjemaState {
    switch (action.type) {
        case ActionType.DinSituasjon: {
            return {
                ...state,
                dinSituasjon: action.value,
            };
        }
        case ActionType.Utdanning: {
            return {
                ...state,
                utdanning: action.value,
            };
        }

        case ActionType.SisteJobb: {
            return {
                ...state,
                sisteJobb: action.value
            }
        }

        case ActionType.GodkjentUtdanning: {
            return {
                ...state,
                godkjentUtdanning: action.value,
            };
        }
        case ActionType.BestaattUtdanning: {
            return {
                ...state,
                bestaattUtdanning: action.value,
            };
        }
        case ActionType.Helseproblemer: {
            return {
                ...state,
                helseproblemer: action.value,
            };
        }
        case ActionType.AndreProblemer: {
            return {
                ...state,
                andreProblemer: action.value,
            };
        }
    }

    return state;
}

const initializer = (skjemaState: SkjemaState) => skjemaState;

const hentNesteSideForDinSituasjon = (valgtSituasjon?: string) => {
    if (valgtSituasjon === Jobbsituasjon.ALDRIJOBBET.valueOf()) {
        return 2;
    }
    return 1;
};

const hentNesteSideForUtdanning = (valgtSituasjon?: string) => {
    if (valgtSituasjon === Utdanningsnivaa.INGEN.valueOf()) {
        return 5;
    }
    return 3;
};

const Skjema: NextPage<SkjemaProps> = props => {
    const hentValgtAlternativForSide = (side: number) => {
        switch (side) {
            case 0:
                return skjemaState.dinSituasjon;
            case 1:
                return skjemaState.sisteJobb;
            case 2:
                return skjemaState.utdanning;
            case 3:
                return skjemaState.godkjentUtdanning;
            case 4:
                return skjemaState.bestaattUtdanning;
            case 5:
                return skjemaState.helseproblemer;
            case 6:
                return skjemaState.andreProblemer;
        }
    };
    const { side } = props;
    const router = useRouter();
    const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(skjemaReducer, {}, initializer);
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const valgt = hentValgtAlternativForSide(side);

    useEffect(() => {
        if (valgt) {
            settVisFeilmelding(!valgt);
        }
    }, [valgt]);

    const siderMap: SiderMap = {
        0: <DinSituasjon
            onChange={value => dispatch({ type: ActionType.DinSituasjon, value })}
            valgt={skjemaState.dinSituasjon}
        />,
        1: <SisteJobb onChange={value => dispatch({ type: ActionType.SisteJobb, value })} valgt={skjemaState.sisteJobb} />,
        2: <Utdanning
            onChange={value => dispatch({ type: ActionType.Utdanning, value })}
            valgt={skjemaState.utdanning}
        />,
        3: <GodkjentUtdanning
            onChange={value => dispatch({ type: ActionType.GodkjentUtdanning, value })}
            valgt={skjemaState.godkjentUtdanning}
        />,
        4: <BestattUtdanning
            onChange={value => dispatch({ type: ActionType.BestaattUtdanning, value })}
            valgt={skjemaState.bestaattUtdanning}
        />,
        5: <Helseproblemer
            onChange={value => dispatch({ type: ActionType.Helseproblemer, value })}
            valgt={skjemaState.helseproblemer}
        />,
        6: <AndreProblemer
            onChange={value => dispatch({ type: ActionType.AndreProblemer, value })}
            valgt={skjemaState.andreProblemer}
        />,
        7: <Oppsummering {...skjemaState} />,
    };

    const hentKomponentForSide = (side: number) => siderMap[side] || siderMap[0];

    const hentNesteSidenummer = (side: number) => {
        if (side === 0) {
            return hentNesteSideForDinSituasjon(skjemaState.dinSituasjon);
        } else if (side === 2) {
            return hentNesteSideForUtdanning(skjemaState.utdanning);
        } else return ++side;
    };

    const validerOgGaaTilNeste = () => {
        if (!hentValgtAlternativForSide(side)) {
            settVisFeilmelding(true);
            return;
        }
        return router.push(`/skjema/${hentNesteSidenummer(side)}`);
    };

    return <>
        <Header />
        <main className={styles.main}>
            {hentKomponentForSide(side)}
            {visFeilmelding && <Alert variant="warning">{tekst('advarsel')}</Alert>}
            <Knapperad onNeste={validerOgGaaTilNeste} skalViseForrigeKnapp={side !== 0} />
            <Avbryt />
        </main>
    </>;
};

Skjema.getInitialProps = async (context: any) => {
    const { side } = context.query;

    return {
        side: Number(side),
    };
};

export default Skjema;
