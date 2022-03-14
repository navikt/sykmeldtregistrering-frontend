import { Back } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import NextLink from 'next/link';

interface TilbakeKnappProps {
    href: string;
}
const TilbakeKnapp = (props: TilbakeKnappProps) => {
    return (
        <NextLink href={props.href} passHref={true}>
            <Link>
                <Back /> Tilbake
            </Link>
        </NextLink>
    );
};

export default TilbakeKnapp;
