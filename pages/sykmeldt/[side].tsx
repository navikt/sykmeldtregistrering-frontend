import { NextPage } from 'next';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useRouter } from 'next/router';
import { Dispatch, useReducer, useState } from 'react';
import { SykmeldtSkjemaSide, SykmeldtSkjemaState } from '../../model/skjema';
import styles from '../../styles/skjema.module.css';
import { Alert } from '@navikt/ds-react';
import { Knapperad } from '../../components/skjema/knapperad/knapperad';
import Avbryt from '../../components/skjema/avbryt-lenke';
import Utdanning from '../../components/skjema/utdanning';
import GodkjentUtdanning from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Oppsummering from '../../components/skjema/oppsummering/oppsummering';
import AndreHensyn from '../../components/skjema/andre-hensyn';
import { beregnNavigering } from '../../lib/sykmeldt-registrering-tilstandsmaskin';
import { SykmeldtSkjemaAction, SykmeldtSkjemaReducer, sykmeldtSkjemaReducer } from '../../lib/sykmeldt-skjema-state';
import SykmeldtFremtidigSituasjon from '../../components/skjema/sykmeldt-fremtidig-situasjon';
import TilbakeTilJobb from '../../components/skjema/tilbake-til-jobb';
import SkalTilbakeTilJobb from '../../components/skjema/skal-tilbake-til-jobb';

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
    },
};

interface SkjemaProps {
    aktivSide: SykmeldtSkjemaSide;
    isValid?: boolean;
}

type SiderMap = { [key: string]: JSX.Element };

const lagSiderMap = (skjemaState: SykmeldtSkjemaState, dispatch: Dispatch<SykmeldtSkjemaAction>): SiderMap => {
    return {
        [SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon]: (
            <SykmeldtFremtidigSituasjon
                onChange={(value) => dispatch({ type: SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon, value })}
            />
        ),
        [SykmeldtSkjemaSide.TilbakeTilJobb]: (
            <TilbakeTilJobb onChange={(value) => dispatch({ type: SykmeldtSkjemaSide.TilbakeTilJobb, value })} />
        ),
        [SykmeldtSkjemaSide.SkalTilbakeTilJobb]: <SkalTilbakeTilJobb />,
        [SykmeldtSkjemaSide.Utdanning]: (
            <Utdanning
                onChange={(value) => dispatch({ type: SykmeldtSkjemaSide.Utdanning, value })}
                valgt={skjemaState.utdanning}
            />
        ),
        [SykmeldtSkjemaSide.GodkjentUtdanning]: (
            <GodkjentUtdanning
                onChange={(value) => dispatch({ type: SykmeldtSkjemaSide.GodkjentUtdanning, value })}
                valgt={skjemaState.godkjentUtdanning}
            />
        ),
        [SykmeldtSkjemaSide.BestaattUtdanning]: (
            <BestattUtdanning
                onChange={(value) => dispatch({ type: SykmeldtSkjemaSide.BestaattUtdanning, value })}
                valgt={skjemaState.bestaattUtdanning}
            />
        ),
        [SykmeldtSkjemaSide.AndreHensyn]: (
            <AndreHensyn
                onChange={(value) => dispatch({ type: SykmeldtSkjemaSide.AndreHensyn, value })}
                valgt={skjemaState.andreProblemer}
            />
        ),
        [SykmeldtSkjemaSide.Oppsummering]: <Oppsummering {...skjemaState} />,
    };
};

const validerSkjemaForSide = (side: SykmeldtSkjemaSide, skjemaState: SykmeldtSkjemaState) => {
    const hentVerdi = () => {
        switch (side) {
            case SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon:
                return skjemaState.sykmeldtFremtidigSituasjon;
            case SykmeldtSkjemaSide.TilbakeTilJobb:
                return skjemaState.tilbakeTilJobb;
            case SykmeldtSkjemaSide.Utdanning:
                return skjemaState.utdanning;
            case SykmeldtSkjemaSide.GodkjentUtdanning:
                return skjemaState.godkjentUtdanning;
            case SykmeldtSkjemaSide.BestaattUtdanning:
                return skjemaState.bestaattUtdanning;
            case SykmeldtSkjemaSide.AndreHensyn:
                return skjemaState.andreProblemer;
        }
    };

    return Boolean(hentVerdi());
};

const hentKomponentForSide = (side: SykmeldtSkjemaSide, siderMap: SiderMap) =>
    siderMap[side] || siderMap[SykmeldtSkjemaSide.SykmeldtFremtidigSituasjon];

const initializer = (skjemaState: SykmeldtSkjemaState) => skjemaState;

const SykmeldtSkjema: NextPage<SkjemaProps> = (props) => {
    const { aktivSide } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();

    const [skjemaState, dispatch] = useReducer<SykmeldtSkjemaReducer, SykmeldtSkjemaState>(
        sykmeldtSkjemaReducer,
        {},
        initializer
    );
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    const { forrige, neste } = beregnNavigering(aktivSide, skjemaState);

    const navigerTilSide = (side: SykmeldtSkjemaSide) => {
        return router.push(`/sykmeldt/${side}`);
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

SykmeldtSkjema.getInitialProps = async (context: any) => {
    const { side } = context.query;

    return {
        aktivSide: side,
    };
};

export default SykmeldtSkjema;
