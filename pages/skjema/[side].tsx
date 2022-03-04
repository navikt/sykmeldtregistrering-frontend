import { NextPage } from 'next';
import { useRouter } from 'next/router';
import DinSituasjon from '../../components/skjema/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/skjema/siste-jobb/siste-jobb';
import Utdanning from '../../components/skjema/utdanning';
import GodkjentUtdanning from '../../components/skjema/utdanning-godkjent';
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
import { StandardSkjemaState, StandardSkjemaSide } from '../../model/skjema';
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

const initializer = (skjemaState: StandardSkjemaState) => skjemaState;

const lagSiderMap = (skjemaState: StandardSkjemaState, dispatch: Dispatch<SkjemaAction>): SiderMap => {
    return {
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
    };
};

const validerSkjemaForSide = (side: StandardSkjemaSide, skjemaState: StandardSkjemaState) => {
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

const hentKomponentForSide = (side: StandardSkjemaSide, siderMap: SiderMap) =>
    siderMap[side] || siderMap[StandardSkjemaSide.DinSituasjon];

const Skjema: NextPage<SkjemaProps> = (props) => {
    const { aktivSide } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();

    const [skjemaState, dispatch] = useReducer<SkjemaReducer, StandardSkjemaState>(skjemaReducer, {}, initializer);
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
