import NextLink from 'next/link';
import { Button, Heading, Panel } from '@navikt/ds-react';

import { SkjemaSide } from '../../model/skjema';

function DemoPanel() {
    if (process.env.NEXT_PUBLIC_ENABLE_MOCK !== 'enabled') return null;

    return (
        <Panel border>
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
            </div>
        </Panel>
    );
}

export default DemoPanel;
