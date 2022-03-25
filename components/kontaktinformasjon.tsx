import { BodyShort, Cell, Detail, Heading, Label, Panel } from '@navikt/ds-react';
import useSprak from '../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';

export type Kontaktinfo = { telefonnummerNAV?: string; telefonnummerKRR?: string };

const TEKSTER: Tekster<string> = {
    nb: {
        tlfHosKRR: 'Telefonnummer lagret hos Kontakt- og reservasjonsregisteret',
        kildeKRR: 'Kilde: Kontakt- og reservasjonsregisteret',
        tlfHosNAV: 'Telefonnummer lagret hos NAV',
        kildeNAV: 'Kilde: NAV',
        endreOpplysninger: 'Endre opplysninger',
    },
};

export const Kontaktinformasjon = (props: { kontaktinfo: Kontaktinfo }) => {
    const { telefonnummerKRR, telefonnummerNAV } = props.kontaktinfo;
    const manglerKontaktinfo = telefonnummerKRR === undefined && telefonnummerNAV === undefined;

    if (manglerKontaktinfo) {
        //TODO: Riktig visning av feilmelding for manglende kontaktinfo
        return (
            <Cell xs={12}>
                <BodyShort>Mangler kontaktinfo</BodyShort>{' '}
            </Cell>
        );
    } else {
        return (
            <>
                {telefonnummerKRR && (
                    <Cell xs={12}>
                        <Telefonnummer kilde="KRR" telefonnummer={telefonnummerKRR!} />
                    </Cell>
                )}
                {telefonnummerNAV && (
                    <Cell xs={12}>
                        <Telefonnummer kilde="NAV" telefonnummer={telefonnummerNAV!} />
                    </Cell>
                )}
            </>
        );
    }
};

type Kilde = 'KRR' | 'NAV';

const Telefonnummer = (props: { kilde: Kilde; telefonnummer: string }) => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel border>
            <Heading size={'small'}>{tekst(`tlfHos${props.kilde}`)}</Heading>
            <Label>{props.telefonnummer}</Label>
            <Detail size={'small'}>{tekst(`kilde${props.kilde}`)}</Detail>
        </Panel>
    );
};
