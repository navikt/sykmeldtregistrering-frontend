import { NextPage } from 'next';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useRouter } from 'next/router';
import { Dispatch, useReducer, useState } from 'react';
import { SkjemaSide, SkjemaState, SykmeldtSkjemaSide } from '../../model/skjema';
import styles from '../../styles/skjema.module.css';
import { Alert } from '@navikt/ds-react';
import { Knapperad } from '../../components/skjema/knapperad/knapperad';
import Avbryt from '../../components/skjema/avbryt-lenke';
import Utdanning from '../../components/skjema/utdanning';
import UtdanningGodkjent from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Oppsummering from '../../components/skjema/oppsummering/oppsummering';
import AndreHensyn from '../../components/skjema/andre-hensyn';
import { beregnNavigering } from '../../lib/sykmeldt-registrering-tilstandsmaskin';
import SykmeldtFremtidigSituasjon from '../../components/skjema/sykmeldt-fremtidig-situasjon';
import TilbakeTilJobb from '../../components/skjema/tilbake-til-jobb';
import SkalTilbakeTilJobb from '../../components/skjema/skal-tilbake-til-jobb';
import { SkjemaAction, skjemaReducer, SkjemaReducer } from '../../lib/skjema-state';
import FullforRegistrering from '../../components/skjema/fullforRegistrering';
import TilbakeKnapp from '../../components/skjema/tilbake-knapp';

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
        fullfor: 'Fullfør registrering',
    },
};

interface SkjemaProps {
    aktivSide: SykmeldtSkjemaSide;
    isValid?: boolean;
}

type SiderMap = { [key: string]: JSX.Element };

const lagSiderMap = (skjemaState: SkjemaState, dispatch: Dispatch<SkjemaAction>): SiderMap => {
    return {
        [SkjemaSide.SykmeldtFremtidigSituasjon]: (
            <SykmeldtFremtidigSituasjon
                onChange={(value: any) => dispatch({ type: SkjemaSide.SykmeldtFremtidigSituasjon, value })}
            />
        ),
        [SkjemaSide.TilbakeTilJobb]: (
            <TilbakeTilJobb onChange={(value: any) => dispatch({ type: SkjemaSide.TilbakeTilJobb, value })} />
        ),
        [SkjemaSide.SkalTilbakeTilJobb]: <SkalTilbakeTilJobb />,
        [SkjemaSide.Utdanning]: (
            <Utdanning
                onChange={(value: any) => dispatch({ type: SkjemaSide.Utdanning, value })}
                valgt={skjemaState.utdanning}
            />
        ),
        [SkjemaSide.GodkjentUtdanning]: (
            <UtdanningGodkjent
                onChange={(value: any) => dispatch({ type: SkjemaSide.GodkjentUtdanning, value })}
                valgt={skjemaState.utdanningGodkjent}
            />
        ),
        [SkjemaSide.BestaattUtdanning]: (
            <BestattUtdanning
                onChange={(value: any) => dispatch({ type: SkjemaSide.BestaattUtdanning, value })}
                valgt={skjemaState.utdanningBestatt}
            />
        ),
        [SkjemaSide.AndreHensyn]: (
            <AndreHensyn
                onChange={(value: any) => dispatch({ type: SkjemaSide.AndreProblemer, value })}
                valgt={skjemaState.andreForhold}
            />
        ),
        [SkjemaSide.Oppsummering]: <Oppsummering {...skjemaState} skjemaPrefix={'/sykmeldt/'} />,
        [SkjemaSide.FullforRegistrering]: <FullforRegistrering skjemaState={skjemaState} />,
    };
};

const validerSkjemaForSide = (side: SkjemaSide, skjemaState: SkjemaState) => {
    const hentVerdi = () => {
        switch (side) {
            case SkjemaSide.SykmeldtFremtidigSituasjon:
                return skjemaState.fremtidigSituasjon;
            case SkjemaSide.TilbakeTilJobb:
                return skjemaState.tilbakeIArbeid;
            case SkjemaSide.Utdanning:
                return skjemaState.utdanning;
            case SkjemaSide.GodkjentUtdanning:
                return skjemaState.utdanningGodkjent;
            case SkjemaSide.BestaattUtdanning:
                return skjemaState.utdanningBestatt;
            case SkjemaSide.AndreHensyn:
                return skjemaState.andreForhold;
            case SkjemaSide.Oppsummering:
                return true;
            case SkjemaSide.FullforRegistrering:
                return true;
        }
    };

    return Boolean(hentVerdi());
};

const hentKomponentForSide = (side: SkjemaSide, siderMap: SiderMap) =>
    siderMap[side] || siderMap[SkjemaSide.SykmeldtFremtidigSituasjon];

const initializer = (skjemaState: SkjemaState) => skjemaState;

const SykmeldtSkjema: NextPage<SkjemaProps> = (props) => {
    const { aktivSide } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();

    const [skjemaState, dispatch] = useReducer<SkjemaReducer, SkjemaState>(skjemaReducer, {}, initializer);
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    const { forrige, neste } = beregnNavigering(aktivSide, skjemaState);

    const navigerTilSide = (side: SkjemaSide) => {
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

    const forrigeLenke = forrige ? `/sykmeldt/${forrige}` : undefined;

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

SykmeldtSkjema.getInitialProps = async (context: any) => {
    const { side } = context.query;

    return {
        aktivSide: side,
    };
};

export default SykmeldtSkjema;
