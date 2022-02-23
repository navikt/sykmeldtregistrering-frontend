import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/header';
import DinSituasjon from '../../components/skjema/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/skjema/siste-jobb/siste-jobb';
import Utdanning from '../../components/skjema/utdanning';
import GodkjentUtdanning from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Helseproblemer from '../../components/skjema/helseproblemer';
import AndreProblemer from '../../components/skjema/andre-problemer';
import { Reducer, useReducer } from 'react';

interface SkjemaProps {
    side: number;
}

type SiderMap = { [key: number]: JSX.Element };

interface SkjemaState {
    dinSituasjon?: string;
}

type SkjemaActions = { type: 'dinSituasjon'; value: string };
type SkjemaReducer = Reducer<SkjemaState, SkjemaActions>;

function skjemaReducer(state: SkjemaState, action: SkjemaActions): SkjemaState {
    switch (action.type) {
        case 'dinSituasjon': {
            return {
                ...state,
                dinSituasjon: action.value,
            };
        }
    }

    return state;
}

const initializer = (skjemaState: SkjemaState) => skjemaState;

const hentNesteSideForDinSituasjon = (valgtSituasjon?: string) => {
    switch (valgtSituasjon) {
        case 'aldriJobbet': {
            return 4;
        }
        case 'usikker': {
            return 3;
        }
        default:
            return 1;
    }
};

const Skjema: NextPage<SkjemaProps> = (props) => {
    const { side } = props;
    const router = useRouter();
    const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(skjemaReducer, {}, initializer);

    const siderMap: SiderMap = {
        0: (
            <DinSituasjon
                onChange={(value) => dispatch({ type: 'dinSituasjon', value })}
                harVerdi={Boolean(skjemaState.dinSituasjon)}
                onNeste={() => router.push(`/skjema/${hentNesteSideForDinSituasjon(skjemaState.dinSituasjon)}`)}
            />
        ),
        1: <SisteJobb />,
        2: <Utdanning />,
        3: <GodkjentUtdanning />,
        4: <BestattUtdanning />,
        5: <Helseproblemer />,
        6: <AndreProblemer />,
    };

    const hentKomponentForSide = (side: number) => {
        return siderMap[side] || siderMap[0];
    };

    return (
        <>
            <Header />
            <main className={styles.main}>{hentKomponentForSide(side)}</main>
        </>
    );
};

Skjema.getInitialProps = async (context: any) => {
    const { side } = context.query;

    return {
        side: Number(side),
    };
};

export default Skjema;
