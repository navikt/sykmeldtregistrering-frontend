import { Back } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import NextLink from 'next/link';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

interface TilbakeKnappProps {
    href: string;
}

const TEKSTER: Tekster<string> = {
    nb: {
        tilbake: 'Tilbake',
    },
    en: {
        tilbake: 'Back',
    },
};

const TilbakeKnapp = (props: TilbakeKnappProps) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <NextLink href={props.href} passHref={true} locale={false}>
            <Link>
                <Back /> {tekst('tilbake')}
            </Link>
        </NextLink>
    );
};

export default TilbakeKnapp;
