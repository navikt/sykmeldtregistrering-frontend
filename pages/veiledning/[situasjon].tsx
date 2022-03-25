import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { fetcher as api } from '../../lib/api-utils';
import {
    Alert,
    BodyShort,
    Button,
    Cell,
    ContentContainer,
    Detail,
    Grid,
    GuidePanel,
    Heading,
    Label,
    Link,
    Panel,
} from '@navikt/ds-react';
import virkedager from '@alheimsins/virkedager';
import { ExternalLink } from '@navikt/ds-icons';

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
        viktig: 'Important:',
        kontakterDegInnen: 'We will contact you before the end of ',
        kontaktopplysningerOppdatert: 'Please make sure your contact details are updated.',
        endreOpplysninger: 'Change contact details',
        //TODO: Oversette alle tekster
    },
};

const KontaktVeileder = (props: { situasjon: Situasjon }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const router = useRouter();

    const idag = new Date();
    const nesteVirkedag = virkedager(idag, 2);
    const [oppgaveOpprettet, settOppgaveOpprettet] = useState<boolean>(false);

    const opprettOppgave = useCallback(async () => {
        try {
            const oppgaveType = props.situasjon === 'utvandret' ? 'UTVANDRET' : 'OPPHOLDSTILLATELSE';

            await api('/api/oppgave', {
                method: 'post',
                body: JSON.stringify({ oppgaveType: oppgaveType }),
            });
            settOppgaveOpprettet(true);
        } catch (e) {}
    }, [props.situasjon]);

    if (oppgaveOpprettet) {
        return <HenvendelseMottatt />;
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

const HenvendelseMottatt = () => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <ContentContainer>
            <GuidePanel poster>
                <Grid>
                    <Cell xs={12}>
                        <Alert variant={'success'}>{tekst('mottatt')}</Alert>
                    </Cell>
                    <Cell xs={12}>
                        <Heading spacing size={'small'}>
                            {tekst('viktig')}
                        </Heading>
                        <BodyShort spacing>
                            {tekst('kontakterDegInnen')}
                            xx.xx.xxxx.
                            {tekst('kontaktopplysningerOppdatert')}
                        </BodyShort>
                    </Cell>
                    <Cell xs={12}>
                        <Kontaktinformasjon kilde="KRR" tlfnr="XXXXXXXXX" />
                    </Cell>
                    <Cell xs={12}>
                        <Kontaktinformasjon kilde="NAV" tlfnr="XXXXXXXXX" />
                    </Cell>
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

type KontaktinfoProps = { kilde: Kilde; tlfnr: string };
type Kilde = 'KRR' | 'NAV';

const Kontaktinformasjon = (props: KontaktinfoProps) => {
    const sprak = useSprak();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const idag = new Date();
    const nesteVirkedag = virkedager(idag, 2);

    return (
        <Panel border>
            <Heading spacing size={'small'}>
                {tekst(`tlfHos${props.kilde}`)}
            </Heading>
            <Label>props.tlfnr</Label>
            <Detail size={'small'}>{tekst(`kilde${props.kilde}`)}</Detail>
        </Panel>
    );
};

KontaktVeileder.getInitialProps = async (context: any) => {
    const { situasjon } = context.query;
    return { situasjon };
};

export default KontaktVeileder;
