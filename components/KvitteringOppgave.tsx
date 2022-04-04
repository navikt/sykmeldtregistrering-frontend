import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';
import { formaterDato } from '../lib/date-utils';
import virkedager from '@alheimsins/virkedager';
import { Alert, AlertProps, Cell, ContentContainer, Grid, GuidePanel, Heading } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { Kontaktinfo, Kontaktinformasjon } from './kontaktinformasjon';
import useSWR from 'swr';
import { fetcher } from '../lib/api-utils';

const TEKSTER: Tekster<string> = {
    nb: {
        alertMottatt: 'Henvendelse mottatt',
        alertVennligstVent: 'Vennligst vent',
        alertFeil: 'Noe gikk galt',
        alleredeBedtOmKontakt:
            'Du har allerede bedt oss kontakte deg. Vi tar kontakt i løpet av to arbeidsdager regnet fra den første meldingen. Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.',
        klarteIkkeMotta:
            'Vi klarte ikke å ta imot henvendelsen din. Vennligst forsøk igjen senere. Opplever du dette flere ganger kan du ringe oss på 55 55 33 33.',
        viktig: 'Viktig:',
        kontakterDegInnen: 'Vi kontakter deg innen utgangen av ',
        kontaktopplysningerOppdatert: 'Pass på at kontaktopplysningene dine er oppdatert, ellers kan vi ikke nå deg.',
        tlfHosKRR: 'Telefonnummer lagret hos Kontakt- og reservasjonsregisteret',
        kildeKRR: 'Kilde: Kontakt- og reservasjonsregisteret',
        tlfHosNAV: 'Telefonnummer lagret hos NAV',
        kildeNAV: 'Kilde: NAV',
        endreOpplysninger: 'Endre opplysninger',
    },
    en: {
        alertMottatt: 'Request received',
        alertVennligstVent: 'Please wait',
        alertFeil: "We're having trouble",
        alleredeBedtOmKontakt:
            'We have received your first message. We will contact you within two working days from the first message. Please make sure your contact details are updated.',
        klarteIkkeMotta:
            'We’re having trouble with your request right now. Please try again later. If you are still having problems, you can call us on 55 55 33 33.',
        viktig: 'Important:',
        kontakterDegInnen: 'We will contact you before the end of ',
        kontaktopplysningerOppdatert: 'Please make sure your contact details are updated.',
        endreOpplysninger: 'Change contact details',
        //TODO: Oversette alle tekster
    },
};

export type Opprettelsesfeil = 'finnesAllerede' | 'opprettelseFeilet';

export const KvitteringOppgaveOpprettet = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const idag = new Date();
    const toVirkedagerFraNaa = formaterDato(virkedager(idag, 2));

    const alertProps: AlertProps = { variant: 'success', children: tekst('alertMottatt') };
    const tittel = tekst('viktig');
    const infotekst = tekst('kontakterDegInnen') + toVirkedagerFraNaa + '. ' + tekst('kontaktopplysningerOppdatert');

    return Kvittering(alertProps, infotekst, tittel);
};

export const KvitteringOppgaveIkkeOpprettet = (props: { feil: Opprettelsesfeil }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    if (props.feil === 'finnesAllerede') {
        return Kvittering({ variant: 'info', children: tekst('alertVennligstVent') }, tekst('alleredeBedtOmKontakt'));
    }
    return Kvittering({ variant: 'error', children: tekst('alertFeil') }, tekst('klarteIkkeMotta'), false);
};

const Kvittering = (alertProps: AlertProps, infotekst: string, visKontaktinfo: boolean = true, tittel?: string) => {
    const [kontaktinfo, settKontaktinfo] = useState<Kontaktinfo | undefined>(undefined);
    const { data, error } = useSWR('/api/kontaktinformasjon', fetcher);

    useEffect(() => {
        if (data) {
            settKontaktinfo({
                telefonnummerNAV: data.telefonnummerHosNav,
                telefonnummerKRR: data.telefonnummerHosKrr,
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            settKontaktinfo({
                telefonnummerNAV: undefined,
                telefonnummerKRR: undefined,
            });
        }
    }, [error]);

    return (
        <ContentContainer>
            <GuidePanel poster>
                <Grid>
                    <Cell xs={12}>
                        <Alert variant={alertProps.variant}>{alertProps.children}</Alert>
                    </Cell>
                    <Cell xs={12}>
                        {tittel && (
                            <Heading spacing size={'small'}>
                                {tittel}
                            </Heading>
                        )}
                        {infotekst}
                    </Cell>
                    {visKontaktinfo && kontaktinfo && <Kontaktinformasjon kontaktinfo={kontaktinfo} />}
                </Grid>
            </GuidePanel>
        </ContentContainer>
    );
};
