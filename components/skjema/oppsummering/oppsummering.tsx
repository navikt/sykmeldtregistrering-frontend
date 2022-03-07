//import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
//import useSprak from '../../../hooks/useSprak';
import { GuidePanel, Heading, Ingress, Link, Table } from '@navikt/ds-react';
import OppsummeringSvg from './oppsummering-svg';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../../hooks/useSprak';
import { hentSvartekst as hentJobbsituasjonTekst } from '../din-situasjon';
import { StandardSkjemaState, StandardSkjemaSide } from '../../../model/skjema';
import NextLink from 'next/link';

const TEKSTER: Tekster<string> = {
    nb: {
        header: 'Er opplysningene riktige?',
        ingress: 'Her er opplysningene vi har registrert om deg.',
        ikkeIJobbSisteAaret: `Ifølge Arbeidsgiver- og arbeidstakerregisteret har du ikke vært i jobb i løpet av det siste året. 
             Hvis det er feil, er det likevel viktig at du fullfører registreringen. Du kan gi riktig informasjon senere til NAV.`,
        situasjon: 'Situasjon',
        sisteStilling: 'Siste stilling',
        hoyesteFullforteUtdanning: 'Høyeste fullførte utdanning',
        utdanningGodkjent: 'Utdanning godkjent i Norge',
        utdanningBestaatt: 'Utdanning bestått',
        helseproblemer: 'Helseproblemer',
        andreProblemer: 'Andre problemer',
    },
};

const Oppsummering = (props: StandardSkjemaState) => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
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
                                svaralternativ={hentJobbsituasjonTekst(sprak, props.dinSituasjon)}
                                side={StandardSkjemaSide.DinSituasjon}
                            />
                        )}
                        {props.sisteJobb && (
                            <Rad
                                radTittel={tekst('sisteStilling')}
                                svaralternativ={props.sisteJobb}
                                side={StandardSkjemaSide.SisteJobb}
                            />
                        )}
                        {props.utdanning && (
                            <Rad
                                radTittel={tekst('hoyesteFullforteUtdanning')}
                                svaralternativ={props.utdanning}
                                side={StandardSkjemaSide.Utdanning}
                            />
                        )}
                        {props.godkjentUtdanning && (
                            <Rad
                                radTittel={tekst('utdanningGodkjent')}
                                svaralternativ={props.godkjentUtdanning}
                                side={StandardSkjemaSide.GodkjentUtdanning}
                            />
                        )}
                        {props.bestaattUtdanning && (
                            <Rad
                                radTittel={tekst('utdanningBestaatt')}
                                svaralternativ={props.bestaattUtdanning}
                                side={StandardSkjemaSide.BestaattUtdanning}
                            />
                        )}
                        {props.helseproblemer && (
                            <Rad
                                radTittel={tekst('helseproblemer')}
                                svaralternativ={props.helseproblemer}
                                side={StandardSkjemaSide.Helseproblemer}
                            />
                        )}
                        {props.andreProblemer && (
                            <Rad
                                radTittel={tekst('andreProblemer')}
                                svaralternativ={props.andreProblemer}
                                side={StandardSkjemaSide.AndreProblemer}
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
    side: StandardSkjemaSide;
}

const Rad = (props: RadProps) => {
    return (
        <Table.Row>
            <Table.HeaderCell scope="row">{props.radTittel}</Table.HeaderCell>
            <Table.DataCell>{props.svaralternativ}</Table.DataCell>
            <Table.DataCell>
                <NextLink href={`/skjema/${props.side}`} passHref>
                    <Link>Endre</Link>
                </NextLink>
            </Table.DataCell>
        </Table.Row>
    );
};

export default Oppsummering;
