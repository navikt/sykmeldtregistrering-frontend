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
import { Reducer, useReducer, useState } from 'react';
import { Knapperad } from '../../components/skjema/knapperad/knapperad';
import Avbryt from '../../components/skjema/avbryt-lenke';
import { Alert } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import Oppsummering from '../../components/skjema/oppsummering/oppsummering';
import SykmeldtFremtidigSituasjon from '../../components/skjema/sykmeldt-fremtidig-situasjon';
import { beregnNavigering } from '../../lib/standard-registrering-tilstandsmaskin';
import { SkjemaSide } from '../../model/skjema';

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
    },
};

interface SkjemaProps {
    aktivSide: SkjemaSide;
    isValid?: boolean;
}

type SiderMap = { [key: number]: JSX.Element };

export interface SkjemaState {
    dinSituasjon?: Jobbsituasjon;
    sisteJobb?: string;
    utdanning?: Utdanningsnivaa;
    godkjentUtdanning?: string;
    bestaattUtdanning?: string;
    helseproblemer?: string;
    andreProblemer?: string;
    sykmeldtFremtidigSituasjon?: string;
}

type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
type SkjemaAction =
    | { type: SkjemaSide.DinSituasjon; value: Jobbsituasjon }
    | { type: SkjemaSide.Utdanning; value: Utdanningsnivaa }
    | { type: Exclude<SkjemaSide, SkjemaSide.DinSituasjon | SkjemaSide.Utdanning>; value: string };

function skjemaReducer(state: SkjemaState, action: SkjemaAction): SkjemaState {
    switch (action.type) {
        case SkjemaSide.DinSituasjon: {
            return {
                ...state,
                dinSituasjon: action.value,
            };
        }
        case SkjemaSide.Utdanning: {
            return {
                ...state,
                utdanning: action.value,
            };
        }

        case SkjemaSide.SisteJobb: {
            return {
                ...state,
                sisteJobb: action.value,
            };
        }

        case SkjemaSide.GodkjentUtdanning: {
            return {
                ...state,
                godkjentUtdanning: action.value,
            };
        }
        case SkjemaSide.BestaattUtdanning: {
            return {
                ...state,
                bestaattUtdanning: action.value,
            };
        }
        case SkjemaSide.Helseproblemer: {
            return {
                ...state,
                helseproblemer: action.value,
            };
        }
        case SkjemaSide.AndreProblemer: {
            return {
                ...state,
                andreProblemer: action.value,
            };
        }
        case SkjemaSide.SykmeldtFremtidigSituasjon: {
            return {
                ...state,
                sykmeldtFremtidigSituasjon: action.value,
            };
        }
    }

    return state;
}

const initializer = (skjemaState: SkjemaState) => skjemaState;

const Skjema: NextPage<SkjemaProps> = (props) => {
    const validerSkjemaForSide = (side: SkjemaSide) => {
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

    const { aktivSide } = props;
    const router = useRouter();
    const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(skjemaReducer, {}, initializer);
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const siderMap: SiderMap = {
        [SkjemaSide.DinSituasjon]: (
            <DinSituasjon
                onChange={(value) => dispatch({ type: SkjemaSide.DinSituasjon, value })}
                valgt={skjemaState.dinSituasjon}
            />
        ),
        [SkjemaSide.SisteJobb]: (
            <SisteJobb
                onChange={(value) => dispatch({ type: SkjemaSide.SisteJobb, value })}
                valgt={skjemaState.sisteJobb}
            />
        ),
        [SkjemaSide.Utdanning]: (
            <Utdanning
                onChange={(value) => dispatch({ type: SkjemaSide.Utdanning, value })}
                valgt={skjemaState.utdanning}
            />
        ),
        [SkjemaSide.GodkjentUtdanning]: (
            <GodkjentUtdanning
                onChange={(value) => dispatch({ type: SkjemaSide.GodkjentUtdanning, value })}
                valgt={skjemaState.godkjentUtdanning}
            />
        ),
        [SkjemaSide.BestaattUtdanning]: (
            <BestattUtdanning
                onChange={(value) => dispatch({ type: SkjemaSide.BestaattUtdanning, value })}
                valgt={skjemaState.bestaattUtdanning}
            />
        ),
        [SkjemaSide.Helseproblemer]: (
            <Helseproblemer
                onChange={(value) => dispatch({ type: SkjemaSide.Helseproblemer, value })}
                valgt={skjemaState.helseproblemer}
            />
        ),
        [SkjemaSide.AndreProblemer]: (
            <AndreProblemer
                onChange={(value) => dispatch({ type: SkjemaSide.AndreProblemer, value })}
                valgt={skjemaState.andreProblemer}
            />
        ),
        [SkjemaSide.Oppsummering]: <Oppsummering {...skjemaState} />,
        '9': (
            <SykmeldtFremtidigSituasjon
                onChange={(value) => dispatch({ type: SkjemaSide.SykmeldtFremtidigSituasjon, value })}
                valgt={skjemaState.sykmeldtFremtidigSituasjon}
            />
        ),
    };

    const hentKomponentForSide = (side: SkjemaSide) => siderMap[side] || siderMap[SkjemaSide.DinSituasjon];

    const { forrige, neste } = beregnNavigering(aktivSide, skjemaState);

    const navigerTilSide = (side: SkjemaSide) => {
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
