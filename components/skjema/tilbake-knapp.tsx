import { Button } from '@navikt/ds-react';
import skjemaStyles from '../../styles/skjema.module.css';

export const TilbakeKnapp = (props: { onClick: () => void }) => {
    return (
        <>
            <div className={skjemaStyles.taCenter}>
                <Button variant="secondary" onClick={props.onClick}>
                    {' '}
                    Tilbake{' '}
                </Button>
            </div>
        </>
    );
};
