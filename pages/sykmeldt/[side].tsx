import { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { Dispatch } from 'react';
import { SkjemaSide, SkjemaState } from '../../model/skjema';
import Utdanning from '../../components/skjema/utdanning';
import UtdanningGodkjent from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Oppsummering from '../../components/skjema/oppsummering/oppsummering';
import { beregnNavigering } from '../../lib/sykmeldt-registrering-tilstandsmaskin';
import SykmeldtFremtidigSituasjon from '../../components/skjema/sykmeldt-fremtidig-situasjon';
import TilbakeTilJobb from '../../components/skjema/tilbake-til-jobb';
import SkalTilbakeTilJobb from '../../components/skjema/skal-tilbake-til-jobb';
import { SkjemaAction } from '../../lib/skjema-state';
import FullforRegistrering from '../../components/skjema/fullforRegistrering';
import { SporsmalId } from '../../model/sporsmal';
import AndreProblemer from '../../components/skjema/andre-problemer';
import skjemaSideFactory, { SiderMap } from '../../components/skjema-side-factory';

const TEKSTER: Tekster<string> = {
    nb: {
        advarsel: 'Du må svare på spørsmålet før du kan gå videre.',
        fullfor: 'Fullfør registrering',
    },
    en: {
        advarsel: 'You will need to answer before you can continue.',
        fullfor: 'Complete the registration',
    },
};

const lagSiderMap = (skjemaState: SkjemaState, dispatch: Dispatch<SkjemaAction>): SiderMap => {
    return {
        [SkjemaSide.SykmeldtFremtidigSituasjon]: (
            <SykmeldtFremtidigSituasjon
                onChange={(value: any) => dispatch({ type: SporsmalId.fremtidigSituasjon, value })}
            />
        ),
        [SkjemaSide.TilbakeTilJobb]: (
            <TilbakeTilJobb onChange={(value: any) => dispatch({ type: SporsmalId.tilbakeIArbeid, value })} />
        ),
        [SkjemaSide.SkalTilbakeTilJobb]: <SkalTilbakeTilJobb />,
        [SkjemaSide.Utdanning]: (
            <Utdanning
                onChange={(value: any) => dispatch({ type: SporsmalId.utdanning, value })}
                valgt={skjemaState.utdanning}
            />
        ),
        [SkjemaSide.GodkjentUtdanning]: (
            <UtdanningGodkjent
                onChange={(value: any) => dispatch({ type: SporsmalId.utdanningGodkjent, value })}
                valgt={skjemaState.utdanningGodkjent}
            />
        ),
        [SkjemaSide.BestaattUtdanning]: (
            <BestattUtdanning
                onChange={(value: any) => dispatch({ type: SporsmalId.utdanningBestatt, value })}
                valgt={skjemaState.utdanningBestatt}
            />
        ),
        [SkjemaSide.AndreProblemer]: (
            <AndreProblemer
                onChange={(value: any) => dispatch({ type: SporsmalId.andreForhold, value })}
                valgt={skjemaState.andreForhold}
                skjematype={'sykmeldt'}
            />
        ),
        [SkjemaSide.Oppsummering]: <Oppsummering skjemaState={skjemaState} skjemaPrefix={'/sykmeldt/'} />,
        [SkjemaSide.FullforRegistrering]: <FullforRegistrering side={'sykmeldt'} skjemaState={skjemaState} />,
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

const hentKomponentForSykmeldtSide = (side: SkjemaSide, siderMap: SiderMap) =>
    siderMap[side] || siderMap[SkjemaSide.SykmeldtFremtidigSituasjon];

const SykmeldtSkjema = skjemaSideFactory({
    TEKSTER,
    urlPrefix: 'sykmeldt',
    validerSkjemaForSide,
    beregnNavigering,
    hentKomponentForSide: (side, skjemaState, dispatch) => {
        return hentKomponentForSykmeldtSide(side, lagSiderMap(skjemaState, dispatch));
    },
});

SykmeldtSkjema.getInitialProps = async (context: any) => {
    const { side } = context.query;

    return {
        aktivSide: side,
    };
};

export default SykmeldtSkjema;
