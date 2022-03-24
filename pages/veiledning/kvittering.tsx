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
        kontaktopplysninger: 'Pass på at kontaktopplysningene dine er oppdatert, ellers kan vi ikke nå deg.',
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
        kontaktopplysninger: 'Please make sure your contact details are updated.',
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
                            {tekst('kontaktopplysninger')}
                        </BodyShort>
                    </Cell>

                    <Cell xs={12}>
                        <Panel border>
                            <Heading spacing size={'small'}>
                                {tekst('tlfHosKRR')}
                            </Heading>
                            <Label>XXXXXXXX</Label>
                            <Detail size={'small'}>{tekst('kildeKRR')}</Detail>
                        </Panel>
                    </Cell>
                    <Cell xs={12}>
                        <Panel border>
                            <Heading spacing size={'small'}>
                                {tekst('tlfHosNAV')}
                            </Heading>
                            <Label>XXXXXXXX</Label>
                            <Detail size={'small'}>{tekst('kildeNAV')}</Detail>
                        </Panel>
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

export default KvitteringOppgave;
