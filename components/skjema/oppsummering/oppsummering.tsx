//import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
//import useSprak from '../../../hooks/useSprak';
import { GuidePanel, Heading, Ingress, Link, Table } from '@navikt/ds-react';
import OppsummeringSvg from './oppsummering-svg';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../../hooks/useSprak';
import { SkjemaSide, SkjemaState } from '../../../model/skjema';
import NextLink from 'next/link';

const TEKSTER: Tekster<string> = {
    nb: {
        header: 'Er opplysningene riktige?',
        ingress: 'Her er opplysningene vi har registrert om deg.',
        ikkeIJobbSisteAaret: `Ifølge Arbeidsgiver- og arbeidstakerregisteret har du ikke vært i jobb i løpet av det siste året. 
             Hvis det er feil, er det likevel viktig at du fullfører registreringen. Du kan gi riktig informasjon senere til NAV.`,
        situasjon: 'Situasjon',
        sisteStilling: 'Siste stilling',
        sykmeldtFremtidigSituasjon: 'Fremtidig situasjon',
        tilbakeTilJobb: 'Tilbake i jobb før sykmeldt i 52 uker',
        hoyesteFullforteUtdanning: 'Høyeste fullførte utdanning',
        utdanningGodkjent: 'Utdanning godkjent i Norge',
        utdanningBestaatt: 'Utdanning bestått',
        helseproblemer: 'Helseproblemer',
        andreProblemer: 'Andre problemer',
        andreHensyn: 'Andre hensyn',
    },
};

interface OppsummeringProps extends SkjemaState {
    skjemaPrefix: '/skjema/' | '/sykmeldt/';
}

const Oppsummering = (props: OppsummeringProps) => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const sideUrl = (side: SkjemaSide) => `${props.skjemaPrefix}${side}`;
    return (
        <>
            <Heading size={'medium'}>{tekst('header')}</Heading>
            <Ingress>{tekst('ingress')}</Ingress>
            <GuidePanel poster illustration={<OppsummeringSvg />}>
                {tekst('ikkeIJobbSisteAaret')}
                <Table>
                    <Table.Body>
                        {props.dinSituasjon && (
                            <Rad
                                radTittel={tekst('situasjon')}
                                svaralternativ={props.dinSituasjon.tekst}
                                url={sideUrl(SkjemaSide.DinSituasjon)}
                            />
                        )}
                        {props.sisteStilling && (
                            <Rad
                                radTittel={tekst('sisteStilling')}
                                svaralternativ={props.sisteStilling.tekst}
                                url={sideUrl(SkjemaSide.SisteJobb)}
                            />
                        )}
                        {props.fremtidigSituasjon && (
                            <Rad
                                radTittel={tekst('sykmeldtFremtidigSituasjon')}
                                svaralternativ={props.fremtidigSituasjon.tekst}
                                url={sideUrl(SkjemaSide.SykmeldtFremtidigSituasjon)}
                            />
                        )}
                        {props.tilbakeIArbeid && (
                            <Rad
                                radTittel={tekst('tilbakeTilJobb')}
                                svaralternativ={props.tilbakeIArbeid.tekst}
                                url={sideUrl(SkjemaSide.TilbakeTilJobb)}
                            />
                        )}
                        {props.utdanning && (
                            <Rad
                                radTittel={tekst('hoyesteFullforteUtdanning')}
                                svaralternativ={props.utdanning.tekst}
                                url={sideUrl(SkjemaSide.Utdanning)}
                            />
                        )}
                        {props.utdanningGodkjent && (
                            <Rad
                                radTittel={tekst('utdanningGodkjent')}
                                svaralternativ={props.utdanningGodkjent.tekst}
                                url={sideUrl(SkjemaSide.GodkjentUtdanning)}
                            />
                        )}
                        {props.utdanningBestatt && (
                            <Rad
                                radTittel={tekst('utdanningBestaatt')}
                                svaralternativ={props.utdanningBestatt.tekst}
                                url={sideUrl(SkjemaSide.BestaattUtdanning)}
                            />
                        )}
                        {props.helseHinder && (
                            <Rad
                                radTittel={tekst('helseproblemer')}
                                svaralternativ={props.helseHinder.tekst}
                                url={sideUrl(SkjemaSide.Helseproblemer)}
                            />
                        )}
                        {props.andreForhold && props.skjemaPrefix === '/sykmeldt/' && (
                            <Rad
                                radTittel={tekst('andreHensyn')}
                                svaralternativ={props.andreForhold.tekst}
                                url={sideUrl(SkjemaSide.AndreHensyn)}
                            />
                        )}
                        {props.andreForhold && props.skjemaPrefix !== '/sykmeldt/' && (
                            <Rad
                                radTittel={tekst('andreProblemer')}
                                svaralternativ={props.andreForhold.tekst}
                                url={sideUrl(SkjemaSide.AndreProblemer)}
                            />
                        )}
                    </Table.Body>
                </Table>
            </GuidePanel>
        </>
    );
};

interface RadProps {
    radTittel: string;
    svaralternativ: string;
    url: string;
}

const Rad = (props: RadProps) => {
    return (
        <Table.Row>
            <Table.HeaderCell scope="row">{props.radTittel}</Table.HeaderCell>
            <Table.DataCell>{props.svaralternativ}</Table.DataCell>
            <Table.DataCell>
                <NextLink href={props.url} passHref>
                    <Link>Endre</Link>
                </NextLink>
            </Table.DataCell>
        </Table.Row>
    );
};

export default Oppsummering;
