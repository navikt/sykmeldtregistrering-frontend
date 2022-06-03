import NextLink from 'next/link';
import { Button, Heading, Panel } from '@navikt/ds-react';

import { SkjemaSide } from '../../model/skjema';

interface Props {
    brukerMock?: boolean;
}

function DemoPanel({ brukerMock }: Props) {
    if (!brukerMock) return null;

    return (
        <Panel border style={{ backgroundColor: 'hotpink' }}>
            <div className="text-center">
                <Heading level="2" size="xlarge">
                    Demo valg
                </Heading>
                <p>
                    <NextLink href={`/skjema/${SkjemaSide.DinSituasjon}`} passHref locale={false}>
                        <Button>Standard registrering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href={`/sykmeldt/`} passHref locale={false}>
                        <Button variant="secondary">Sykmeldt registrering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/kvittering/" passHref locale={false}>
                        <Button variant="secondary">Kvittering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/reaktivering" passHref locale={false}>
                        <Button variant="secondary">Reaktivering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/kvittering-reaktivering/" passHref locale={false}>
                        <Button variant="secondary">Kvittering Reaktivering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/registrering/utvandret/" passHref locale={false}>
                        <Button variant="secondary">Utvandret</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/reaktivering/utvandret/" passHref locale={false}>
                        <Button variant="secondary">Utvandret Reaktivering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/registrering/mangler-arbeidstillatelse/" passHref locale={false}>
                        <Button variant="secondary">Mangler arbeidstillatelse</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/allerede-registrert/" passHref locale={false}>
                        <Button variant="secondary">Allerede registrert</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/sperret/" passHref locale={false}>
                        <Button variant="secondary">Sperret</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/vedlikehold/" passHref locale={false}>
                        <Button variant="secondary">Vedlikehold</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/feil/" passHref locale={false}>
                        <Button variant="secondary">Feil</Button>
                    </NextLink>
                </p>
            </div>
        </Panel>
    );
}

export default DemoPanel;
