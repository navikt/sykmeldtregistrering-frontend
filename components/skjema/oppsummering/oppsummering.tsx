import { GuidePanel, Heading, Ingress, Link, Table } from '@navikt/ds-react';
import OppsummeringSvg from './oppsummering-svg';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../../hooks/useSprak';
import { hentSkjemaside, SkjemaSide, SkjemaState } from '../../../model/skjema';
import NextLink from 'next/link';
import { hentTekst, SporsmalId } from '../../../model/sporsmal';

const TEKSTER: Tekster<string> = {
    nb: {
        header: 'Er opplysningene riktige?',
        ingress: 'Her er opplysningene vi har registrert om deg.',
        ikkeIJobbSisteAaret: `Ifølge Arbeidsgiver- og arbeidstakerregisteret har du ikke vært i jobb i løpet av det siste året. 
             Hvis det er feil, er det likevel viktig at du fullfører registreringen. Du kan gi riktig informasjon senere til NAV.`,
        [SporsmalId.dinSituasjon + 'radTittel']: 'Situasjon',
        [SporsmalId.sisteJobb + 'radTittel']: 'Siste stilling',
        [SporsmalId.fremtidigSituasjon + 'radTittel']: 'Fremtidig situasjon',
        [SporsmalId.tilbakeIArbeid + 'radTittel']: 'Tilbake i jobb før sykmeldt i 52 uker',
        [SporsmalId.utdanning + 'radTittel']: 'Høyeste fullførte utdanning',
        [SporsmalId.utdanningGodkjent + 'radTittel']: 'Utdanning godkjent i Norge',
        [SporsmalId.utdanningBestatt + 'radTittel']: 'Utdanning bestått',
        [SporsmalId.helseHinder + 'radTittel']: 'Helseproblemer',
        [SporsmalId.andreForhold + 'radTittel']: 'Andre problemer',
        [SporsmalId.andreForhold + 'radTittel']: 'Andre hensyn',
    },
};

interface OppsummeringProps {
    skjemaState: SkjemaState;
    skjemaPrefix: '/skjema/' | '/sykmeldt/';
}

const Oppsummering = ({ skjemaState, skjemaPrefix }: OppsummeringProps) => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <Heading size={'medium'}>{tekst('header')}</Heading>
            <Ingress>{tekst('ingress')}</Ingress>
            <GuidePanel poster illustration={<OppsummeringSvg />}>
                {tekst('ikkeIJobbSisteAaret')}
                <Table>
                    {Object.entries(skjemaState)
                        .filter(([sporsmalId]) => sporsmalId !== SporsmalId.sisteStilling)
                        .map(
                            ([sporsmalId, svar]) =>
                                svar && (
                                    <Rad
                                        radTittel={tekst(sporsmalId + 'radTittel')}
                                        svaralternativ={
                                            sporsmalId === SporsmalId.sisteJobb ? svar.label : hentTekst(sprak, svar)
                                        }
                                        url={`${skjemaPrefix}${hentSkjemaside(sporsmalId as SporsmalId)}`}
                                    />
                                )
                        )}
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
