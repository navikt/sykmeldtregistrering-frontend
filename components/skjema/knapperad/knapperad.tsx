import {Cell, Grid} from "@navikt/ds-react";
import {TilbakeKnapp} from "../tilbake-knapp";
import Neste from "../neste-knapp";
import {useRouter} from "next/router";
import styles from './knapperad.module.css';

interface Knapperadprops {
    onNeste: () => void,
    skalViseForrigeKnapp: boolean
}

export const Knapperad = (props: Knapperadprops) => {
    const router = useRouter();

    return (
        <Grid>
            <Cell xs={6} className={styles.knapp}>
                {props.skalViseForrigeKnapp &&
                    <TilbakeKnapp onclick={router.back}/>
                }
            </Cell>

            <Cell xs={6} className={styles.knapp}>
                <Neste onClick={props.onNeste}/>
            </Cell>
        </Grid>
    )
}