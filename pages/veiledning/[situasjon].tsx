import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useCallback, useEffect, useState } from 'react';
import { fetcher, fetcher as api } from '../../lib/api-utils';
import {
    Alert,
    AlertProps,
    BodyShort,
    Button,
    Cell,
    ContentContainer,
    Grid,
    GuidePanel,
    Heading,
    Link,
    Panel,
} from '@navikt/ds-react';
import virkedager from '@alheimsins/virkedager';
import { ExternalLink } from '@navikt/ds-icons';
import { Kontaktinfo, Kontaktinformasjon } from '../../components/kontaktinformasjon';
import { formaterDato } from '../../lib/date-utils';
import useSWR from 'swr';

export type Situasjon = 'utvandret' | 'mangler-arbeidstillatelse';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'En veileder må hjelpe deg slik at du blir registrert',
        utvandretBody1: 'Du står registrert som utvandret i våre systemer.',
        manglerArbeidstillatelseBody1: 'Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.',
        body2: 'Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.',
        kontaktOss: 'Kontakt oss, så hjelper vi deg videre.',
        kontaktKnapp: 'Ta kontakt',
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

type Opprettelsesfeil = 'finnesAllerede' | 'opprettelseFeilet';

const KontaktVeileder = (props: { situasjon: Situasjon }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [responseMottatt, settResponseMottatt] = useState<boolean>(false);
    const [feil, settFeil] = useState<Opprettelsesfeil | undefined>(undefined);
    const opprettOppgave = useCallback(async () => {
        try {
            const oppgaveType = props.situasjon === 'utvandret' ? 'UTVANDRET' : 'OPPHOLDSTILLATELSE';

            await api('/api/oppgave', {
                method: 'post',
                body: JSON.stringify({ oppgaveType: oppgaveType }),
                onError: (res) => {
                    if (res.status === 403) {
                        settFeil('finnesAllerede');
                    } else {
                        throw Error(res.statusText);
                    }
                },
            });
        } catch (e) {
            settFeil('opprettelseFeilet');
        }
        settResponseMottatt(true);
    }, [props.situasjon]);

    if (responseMottatt) {
        return feil ? <KvitteringOppgaveIkkeOpprettet feil={feil} /> : <KvitteringOppgaveOpprettet />;
    } else
        return (
            <Panel border>
                <Heading size="medium" spacing={true}>
                    {tekst('heading')}
                </Heading>
                <BodyShort>
                    {tekst(props.situasjon === 'utvandret' ? 'utvandretBody1' : 'manglerArbeidstillatelseBody1')}
                </BodyShort>
                <BodyShort spacing>{tekst('body2')}</BodyShort>
                <BodyShort spacing>{tekst('kontaktOss')}</BodyShort>
                <Button onClick={opprettOppgave}>{tekst('kontaktKnapp')}</Button>
            </Panel>
        );
};

const KvitteringOppgaveOpprettet = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const idag = new Date();
    const toVirkedagerFraNaa = formaterDato(virkedager(idag, 2));

    const alertProps: AlertProps = { variant: 'success', children: tekst('alertMottatt') };
    const tittel = tekst('viktig');
    const infotekst = tekst('kontakterDegInnen') + toVirkedagerFraNaa + '. ' + tekst('kontaktopplysningerOppdatert');

    return Kvittering(alertProps, infotekst, tittel);
};

const KvitteringOppgaveIkkeOpprettet = (props: { feil: Opprettelsesfeil }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    if (props.feil === 'finnesAllerede') {
        return Kvittering({ variant: 'info', children: tekst('alertVennligstVent') }, tekst('alleredeBedtOmKontakt'));
    }
    return Kvittering({ variant: 'error', children: tekst('alertFeil') }, tekst('klarteIkkeMotta'), false);
};

const Kvittering = (alertProps: AlertProps, infotekst: string, visKontaktinfo: boolean = true, tittel?: string) => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
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
    // TODO: feilhåndtering
    // useEffect(() => {
    //     if (error) {
    //         settKontaktinfo({
    //             telefonnummerNAV: undefined,
    //             telefonnummerKRR: undefined,
    //         });
    //     }
    // }, [error]);

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

KontaktVeileder.getInitialProps = async (context: any) => {
    const { situasjon } = context.query;
    return { situasjon };
};

export default KontaktVeileder;
