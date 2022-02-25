//import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
//import useSprak from '../../../hooks/useSprak';
import { GuidePanel, Heading, Ingress, Table } from '@navikt/ds-react';
import OppsummeringSvg from './oppsummering-svg';
import { SkjemaState } from '../../../pages/skjema/[side]';

const Oppsummering = (props: SkjemaState) => {
    return (
        <>
            <Heading size={'medium'}>Er opplysningene riktige?</Heading>
            <Ingress>Her er opplysningene vi har registrert om deg.</Ingress>
            <GuidePanel poster illustration={<OppsummeringSvg />}>
                Ifølge Arbeidsgiver- og arbeidstakerregisteret har du ikke vært i jobb i løpet av det siste året. Hvis
                det er feil, er det likevel viktig at du fullfører registreringen. Du kan gi riktig informasjon senere
                til NAV.
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell scope="row">Situasjon</Table.HeaderCell>
                            <Table.DataCell>{props.dinSituasjon}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell scope="row">Siste stilling</Table.HeaderCell>
                            <Table.DataCell>{props.sisteJobb}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell scope="row">Høyeste fullførte utdanning</Table.HeaderCell>
                            <Table.DataCell>{props.utdanning}</Table.DataCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </GuidePanel>
        </>
    );
};

export default Oppsummering;
