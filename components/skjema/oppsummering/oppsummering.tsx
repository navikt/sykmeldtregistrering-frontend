//import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
//import useSprak from '../../../hooks/useSprak';
import { GuidePanel, Heading, Ingress, Table } from '@navikt/ds-react';
import OppsummeringSvg from './oppsummering-svg';
import { SkjemaState } from '../../../pages/skjema/[side]';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../../hooks/useSprak';
import { Jobbsituasjon } from '../din-situasjon';

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

const Oppsummering = (props: SkjemaState) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <>
            <Heading size={'medium'}>{tekst('header')}</Heading>
            <Ingress>{tekst('ingress')}</Ingress>
            <GuidePanel poster illustration={<OppsummeringSvg />}>
                {tekst('ikkeIJobbSisteAaret')}
                <Table>
                    <Table.Body>
                        {props.dinSituasjon && (
                            <Rad radTittel={tekst('situasjon')} svaralternativ={props.dinSituasjon} />
                        )}
                        {props.sisteJobb && (
                            <Rad radTittel={tekst('sisteStilling')} svaralternativ={props.sisteJobb} />
                        )}
                        {props.utdanning && (
                            <Rad radTittel={tekst('hoyesteFullforteUtdanning')} svaralternativ={props.utdanning} />
                        )}
                        {props.godkjentUtdanning && (
                            <Rad radTittel={tekst('utdanningGodkjent')} svaralternativ={props.godkjentUtdanning} />
                        )}
                        {props.bestaattUtdanning && (
                            <Rad radTittel={tekst('utdanningBestaatt')} svaralternativ={props.bestaattUtdanning} />
                        )}
                        {props.helseproblemer && (
                            <Rad radTittel={tekst('helseproblemer')} svaralternativ={props.helseproblemer} />
                        )}
                        {props.andreProblemer && (
                            <Rad radTittel={tekst('andreProblemer')} svaralternativ={props.andreProblemer} />
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
}

const Rad = (props: RadProps) => {
    return (
        <Table.Row>
            <Table.HeaderCell scope="row">{props.radTittel}</Table.HeaderCell>
            <Table.DataCell>{props.svaralternativ}</Table.DataCell>
        </Table.Row>
    );
};

export default Oppsummering;
