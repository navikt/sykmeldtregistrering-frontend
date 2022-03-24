import {
    Alert,
    BodyShort,
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
import useSprak from '../../hooks/useSprak';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { ExternalLink } from '@navikt/ds-icons';

const TEKSTER: Tekster<string> = {
    nb: {
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

const KvitteringOppgave = () => {
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
export default KvitteringOppgave;
