import { Accordion, BodyShort, Button, Heading } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../../hooks/useSprak';
import { useEffect, useState } from 'react';
import StillingsSok from './stillings-sok';
import { SkjemaKomponentProps } from '../skjema-felleskomponenter';
import { SisteJobb } from '../../../model/skjema';
import useSWR from 'swr';
import { fetcher } from '../../../lib/api-utils';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva er din siste jobb?',
        registrert: 'Følgende informasjon er registrert i Aa-registeret om din siste stilling.',
        feilOpplysninger: 'Hvis opplysningen er feil, kan du endre under.',
        brukesTilTittel: 'Hva bruker vi informasjonen om din siste stilling til?',
        brukesTilInnhold:
            'Vi bruker opplysningene til å lage offentlig statistikk om arbeidsmarkedet. Hvis opplysningene er feil, kan du endre dem. Da får NAV riktigere statistikk. Vær oppmerksom på at opplysningene er hentet fra Arbeidsgiver- og arbeidstakerregisteret (Aa-registeret). Endrer du opplysninger hos NAV, blir de bare lagret hos oss. I Aa-registeret er det kun arbeidsgivere som kan endre.',
        stilling: 'Stilling',
    },
};

const tomStilling: SisteJobb = {
    label: '',
    konseptId: -1,
    styrk08: '-1',
};

const SisteJobb = (props: SkjemaKomponentProps<SisteJobb> & { children?: JSX.Element; visSisteJobb: boolean }) => {
    const { onChange, visSisteJobb } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());
    const [visStillingsSok, settVisStillingsSok] = useState<boolean>(false);
    const onCloseStillingssok = (value?: any) => {
        if (value) {
            onChange(value);
        }
        settVisStillingsSok(false);
    };

    const { data: sisteArbeidsforhold, error } = useSWR('/api/sistearbeidsforhold', fetcher);

    useEffect(() => {
        if (sisteArbeidsforhold && !props.valgt) {
            onChange(sisteArbeidsforhold);
        }
    }, [sisteArbeidsforhold]);

    useEffect(() => {
        if (error && !props.valgt) {
            onChange(tomStilling);
        }
    }, [error]);

    return (
        <div>
            <Heading spacing size={'large'} level="1">
                {tekst('tittel')}
            </Heading>
            <BodyShort>{tekst('registrert')}</BodyShort>
            <BodyShort className="mbm">{tekst('feilOpplysninger')}</BodyShort>

            {props.children}

            {visSisteJobb && (
                <>
                    <Heading spacing size={'small'} level="2">
                        {tekst('stilling')}
                    </Heading>
                    {visStillingsSok ? (
                        <StillingsSok onClose={onCloseStillingssok} />
                    ) : (
                        <div>
                            {props.valgt?.label}
                            <Button variant="tertiary" onClick={() => settVisStillingsSok(true)}>
                                Endre
                            </Button>
                        </div>
                    )}
                </>
            )}

            <div style={{ maxWidth: '34rem', margin: '2em 0' }}>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>{tekst('brukesTilTittel')}</Accordion.Header>
                        <Accordion.Content>{tekst('brukesTilInnhold')}</Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default SisteJobb;
