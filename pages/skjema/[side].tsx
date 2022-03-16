import { NextPage } from 'next';
import { useRouter } from 'next/router';
import DinSituasjon from '../../components/skjema/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/skjema/siste-jobb/siste-jobb';
import Utdanning from '../../components/skjema/utdanning';
import UtdanningGodkjent from '../../components/skjema/utdanning-godkjent';
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
import { SkjemaSide, SkjemaState, StandardSkjemaSide } from '../../model/skjema';
import { SkjemaAction, skjemaReducer, SkjemaReducer } from '../../lib/skjema-state';
import FullforRegistrering from '../../components/skjema/fullforRegistrering';
import TilbakeKnapp from '../../components/skjema/tilbake-knapp';

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
                onChange={(value) => dispatch({ type: SkjemaSide.DinSituasjon, value: value })}
                valgt={skjemaState.dinSituasjon}
            />
        ),
        [SkjemaSide.SisteJobb]: (
            <SisteJobb
                onChange={(value) => dispatch({ type: SkjemaSide.SisteJobb, value: value })}
                valgt={skjemaState.sisteStilling}
            />
        ),
        [SkjemaSide.Utdanning]: (
            <Utdanning
                onChange={(value) => dispatch({ type: SkjemaSide.Utdanning, value: value })}
                valgt={skjemaState.utdanning}
            />
        ),
        [SkjemaSide.GodkjentUtdanning]: (
            <UtdanningGodkjent
                onChange={(value) => dispatch({ type: SkjemaSide.GodkjentUtdanning, value: value })}
                valgt={skjemaState.utdanningGodkjent}
            />
        ),
        [SkjemaSide.BestaattUtdanning]: (
            <BestattUtdanning
                onChange={(value) => dispatch({ type: SkjemaSide.BestaattUtdanning, value: value })}
                valgt={skjemaState.utdanningBestatt}
            />
        ),
        [SkjemaSide.Helseproblemer]: (
            <Helseproblemer
                onChange={(value) => dispatch({ type: SkjemaSide.Helseproblemer, value: value })}
                valgt={skjemaState.helseHinder}
            />
        ),
        [SkjemaSide.AndreProblemer]: (
            <AndreProblemer
                onChange={(value) => dispatch({ type: SkjemaSide.AndreProblemer, value: value })}
                valgt={skjemaState.andreForhold}
            />
        ),
        [SkjemaSide.Oppsummering]: <Oppsummering skjemaState={skjemaState} skjemaPrefix={'/skjema/'} />,
        [SkjemaSide.FullforRegistrering]: <FullforRegistrering skjemaState={skjemaState} />,
    };
};

const validerSkjemaForSide = (side: StandardSkjemaSide, skjemaState: SkjemaState) => {
    const hentVerdi = () => {
        switch (side) {
            case SkjemaSide.DinSituasjon:
                return skjemaState.dinSituasjon;
            case SkjemaSide.SisteJobb:
                return skjemaState.sisteStilling;
            case SkjemaSide.Utdanning:
                return skjemaState.utdanning;
            case SkjemaSide.GodkjentUtdanning:
                return skjemaState.utdanningGodkjent;
            case SkjemaSide.BestaattUtdanning:
                return skjemaState.utdanningBestatt;
            case SkjemaSide.Helseproblemer:
                return skjemaState.helseHinder;
            case SkjemaSide.AndreProblemer:
                return skjemaState.andreForhold;
            case SkjemaSide.Oppsummering:
                return true;
            case SkjemaSide.FullforRegistrering:
                return true;
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

    const forrigeLenke = forrige ? `/skjema/${forrige}` : undefined;

    return (
        <>
            <main className={styles.main}>
                {forrigeLenke && <TilbakeKnapp href={forrigeLenke} />}
                {hentKomponentForSide(aktivSide, lagSiderMap(skjemaState, dispatch))}
                {visFeilmelding && <Alert variant="warning">{tekst('advarsel')}</Alert>}
                <Knapperad onNeste={validerOgGaaTilNeste} />
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
