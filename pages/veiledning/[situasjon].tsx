import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useCallback, useState } from 'react';
import { fetcher as api } from '../../lib/api-utils';
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

export type Situasjon = 'utvandret' | 'mangler-arbeidstillatelse';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'En veileder må hjelpe deg slik at du blir registrert',
        utvandretBody1: 'Du står registrert som utvandret i våre systemer.',
        manglerArbeidstillatelseBody1: 'Vi har ikke mulighet til å sjekke om du har en godkjent oppholdstillatelse.',
        body2: 'Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.',
        kontaktOss: 'Kontakt oss, så hjelper vi deg videre.',
        kontaktKnapp: 'Ta kontakt',
        mottatt: 'Henvendelse mottatt',
        vennligstVent: 'Vennligst vent',
        alleredeBedtOmKontakt:
            'Du har allerede bedt oss kontakte deg. Vi tar kontakt i løpet av to arbeidsdager regnet fra den første meldingen. Pass på at kontaktopplysningene dine er oppdatert ellers kan vi ikke nå deg.',
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
        mottatt: 'Request received',
        vennligstVent: 'Please wait',
        alleredeBedtOmKontakt:
            'We have received your first message. We will contact you within two working days from the first message. Please make sure your contact details are updated.',
        viktig: 'Important:',
        kontakterDegInnen: 'We will contact you before the end of ',
        kontaktopplysningerOppdatert: 'Please make sure your contact details are updated.',
        endreOpplysninger: 'Change contact details',
        //TODO: Oversette alle tekster
    },
};

type OppgaveRespons = {
    id: number;
    tildeltEnhetsnr: number;
    data: {
        telefonnummerHosKrr: string;
        telefonnummerHosNav: string;
    };
    response: string;
};

const KontaktVeileder = (props: { situasjon: Situasjon }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [oppgaveOpprettet, settOppgaveOpprettet] = useState<boolean>(false);
    const [kontaktinfo, settKontaktinfo] = useState<Kontaktinfo>({
        telefonnummerNAV: undefined,
        telefonnummerKRR: undefined,
    });

    const opprettOppgave = useCallback(async () => {
        try {
            const oppgaveType = props.situasjon === 'utvandret' ? 'UTVANDRET' : 'OPPHOLDSTILLATELSE';

            const { data }: OppgaveRespons = await api('/api/oppgave', {
                method: 'post',
                body: JSON.stringify({ oppgaveType: oppgaveType }),
            });
            settOppgaveOpprettet(true);
            settKontaktinfo({ telefonnummerNAV: data.telefonnummerHosNav, telefonnummerKRR: data.telefonnummerHosKrr });
        } catch (e) {}
    }, [props.situasjon]);

    if (oppgaveOpprettet) {
        //TODO: Sjekke om henvendelsen allerede er mottatt. Inntil videre hardkodet til false.
        return <HenvendelseMottatt kontaktinfo={kontaktinfo} alleredeMottatt={false} />;
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

const HenvendelseMottatt = (props: { kontaktinfo: Kontaktinfo; alleredeMottatt: Boolean }) => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const idag = new Date();
    const toVirkedagerFraNaa = virkedager(idag, 2);

    const alertProps: AlertProps = props.alleredeMottatt
        ? { variant: 'info', children: tekst('vennligstVent') }
        : { variant: 'success', children: tekst('mottatt') };

    return (
        <ContentContainer>
            <GuidePanel poster>
                <Grid>
                    <Cell xs={12}>
                        <Alert variant={alertProps.variant}>{alertProps.children}</Alert>
                    </Cell>
                    <Cell xs={12}>
                        {props.alleredeMottatt ? (
                            tekst('alleredeBedtOmKontakt')
                        ) : (
                            <>
                                <Heading spacing size={'small'}>
                                    {tekst('viktig')}
                                </Heading>
                                <BodyShort spacing>
                                    {tekst('kontakterDegInnen')}
                                    {formaterDato(toVirkedagerFraNaa)}
                                    {'. '}
                                    {tekst('kontaktopplysningerOppdatert')}
                                </BodyShort>
                            </>
                        )}
                    </Cell>
                    <Kontaktinformasjon kontaktinfo={props.kontaktinfo} />
                    <Cell xs={12}>
                        <Link href="https://www.nav.no/person/personopplysninger/#kontaktinformasjon">
                            {tekst('endreOpplysninger')}
                            <ExternalLink />
                        </Link>
                    </Cell>
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
