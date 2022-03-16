import { GuidePanel, Heading, Ingress, Link, Table } from '@navikt/ds-react';
import OppsummeringSvg from './oppsummering-svg';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../../hooks/useSprak';
import { SkjemaSide, SkjemaState } from '../../../model/skjema';
import NextLink from 'next/link';
import { hentTekst } from '../../../model/sporsmal';

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
    console.log('props?', props);
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
                                svaralternativ={hentTekst(sprak, props.dinSituasjon)}
                                url={sideUrl(SkjemaSide.DinSituasjon)}
                            />
                        )}
                        {props.sisteStilling && (
                            <Rad
                                radTittel={tekst('sisteStilling')}
                                svaralternativ={hentTekst(sprak, props.sisteStilling)}
                                url={sideUrl(SkjemaSide.SisteJobb)}
                            />
                        )}
                        {props.fremtidigSituasjon && (
                            <Rad
                                radTittel={tekst('sykmeldtFremtidigSituasjon')}
                                svaralternativ={hentTekst(sprak, props.fremtidigSituasjon)}
                                url={sideUrl(SkjemaSide.SykmeldtFremtidigSituasjon)}
                            />
                        )}
                        {props.tilbakeIArbeid && (
                            <Rad
                                radTittel={tekst('tilbakeTilJobb')}
                                svaralternativ={hentTekst(sprak, props.tilbakeIArbeid)}
                                url={sideUrl(SkjemaSide.TilbakeTilJobb)}
                            />
                        )}
                        {props.utdanning && (
                            <Rad
                                radTittel={tekst('hoyesteFullforteUtdanning')}
                                svaralternativ={hentTekst(sprak, props.utdanning)}
                                url={sideUrl(SkjemaSide.Utdanning)}
                            />
                        )}
                        {props.utdanningGodkjent && (
                            <Rad
                                radTittel={tekst('utdanningGodkjent')}
                                svaralternativ={hentTekst(sprak, props.utdanningGodkjent)}
                                url={sideUrl(SkjemaSide.GodkjentUtdanning)}
                            />
                        )}
                        {props.utdanningBestatt && (
                            <Rad
                                radTittel={tekst('utdanningBestaatt')}
                                svaralternativ={hentTekst(sprak, props.utdanningBestatt)}
                                url={sideUrl(SkjemaSide.BestaattUtdanning)}
                            />
                        )}
                        {props.helseHinder && (
                            <Rad
                                radTittel={tekst('helseproblemer')}
                                svaralternativ={hentTekst(sprak, props.helseHinder)}
                                url={sideUrl(SkjemaSide.Helseproblemer)}
                            />
                        )}
                        {props.andreForhold && props.skjemaPrefix === '/sykmeldt/' && (
                            <Rad
                                radTittel={tekst('andreHensyn')}
                                svaralternativ={hentTekst(sprak, props.andreForhold)}
                                url={sideUrl(SkjemaSide.AndreHensyn)}
                            />
                        )}
                        {props.andreForhold && props.skjemaPrefix !== '/sykmeldt/' && (
                            <Rad
                                radTittel={tekst('andreProblemer')}
                                svaralternativ={hentTekst(sprak, props.andreForhold)}
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
