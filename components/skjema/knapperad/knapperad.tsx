import { Cell, Grid } from '@navikt/ds-react';
import { TilbakeKnapp } from '../tilbake-knapp';
import Neste from '../neste-knapp';
import styles from './knapperad.module.css';

interface Knapperadprops {
    onNeste: () => void;
    onForrige?: () => void;
}

export const Knapperad = (props: Knapperadprops) => {
    return (
        <Grid>
            <Cell xs={6} className={styles.knapp}>
                {props.onForrige && <TilbakeKnapp onClick={props.onForrige} />}
            </Cell>

            <Cell xs={6} className={styles.knapp}>
                <Neste onClick={props.onNeste} />
            </Cell>
        </Grid>
    );
};
