//import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
//import useSprak from '../../../hooks/useSprak';
import { GuidePanel, Heading, Ingress, Table } from '@navikt/ds-react';
import OppsummeringSvg from './oppsummering-svg';
import { SkjemaState } from '../../../pages/skjema/[side]';
import lagHentTekstForSprak, {Tekster} from "../../../lib/lag-hent-tekst-for-sprak";
import useSprak from "../../../hooks/useSprak";
import {Jobbsituasjon} from "../din-situasjon";

const TEKSTER: Tekster<string> = {
    nb: {
        header: "Er opplysningene riktige?",
        ingress: "Her er opplysningene vi har registrert om deg.",
        ikkeIJobbSisteAaret:
            `Ifølge Arbeidsgiver- og arbeidstakerregisteret har du ikke vært i jobb i løpet av det siste året. 
             Hvis det er feil, er det likevel viktig at du fullfører registreringen. Du kan gi riktig informasjon senere til NAV.`,
        situasjon: "Situasjon",
        sisteStilling: "Siste stilling",
        hoyesteFullforteUtdanning: "Høyeste fullførte utdanning",
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
                        <Table.Row>
                            <Table.HeaderCell scope="row">{tekst('situasjon')}</Table.HeaderCell>
                            <Table.DataCell>{props.dinSituasjon}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell scope="row">{tekst('sisteStilling')}</Table.HeaderCell>
                            <Table.DataCell>{props.sisteJobb}</Table.DataCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell scope="row">{tekst('hoyesteFullforteUtdanning')}</Table.HeaderCell>
                            <Table.DataCell>{props.utdanning}</Table.DataCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </GuidePanel>
        </>
    );
};

export default Oppsummering;
