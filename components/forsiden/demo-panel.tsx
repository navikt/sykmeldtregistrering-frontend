import NextLink from 'next/link';
import { Button, Heading, Panel } from '@navikt/ds-react';

import { SkjemaSide } from '../../model/skjema';

function DemoPanel() {
    if (process.env.NEXT_PUBLIC_ENABLE_MOCK !== 'enabled') return null;

    return (
        <Panel border style={{ backgroundColor: 'hotpink' }}>
            <div className="text-center">
                <Heading level="2" size="xlarge">
                    Demo valg
                </Heading>
                <p>
                    <NextLink href={`/skjema/${SkjemaSide.DinSituasjon}`} passHref>
                        <Button>Standard registrering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href={`/sykmeldt/${SkjemaSide.SykmeldtFremtidigSituasjon}`} passHref>
                        <Button variant="secondary">Sykmeldt registrering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/kvittering/" passHref>
                        <Button variant="secondary">Kvittering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/reaktivering" passHref>
                        <Button variant="secondary">Reaktivering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/kvittering-reaktivering/" passHref>
                        <Button variant="secondary">Kvittering Reaktivering</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/utvandret/" passHref>
                        <Button variant="secondary">Utvandret</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/mangler-arbeidstillatelse/" passHref>
                        <Button variant="secondary">Mangler arbeidstillatelse</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/allerede-registrert/" passHref>
                        <Button variant="secondary">Allerede registrert</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/veiledning/sperret/" passHref>
                        <Button variant="secondary">Sperret</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/vedlikehold/" passHref>
                        <Button variant="secondary">Vedlikehold</Button>
                    </NextLink>
                </p>
                <p>
                    <NextLink href="/feil/" passHref>
                        <Button variant="secondary">Feil</Button>
                    </NextLink>
                </p>
            </div>
        </Panel>
    );
}

export default DemoPanel;
