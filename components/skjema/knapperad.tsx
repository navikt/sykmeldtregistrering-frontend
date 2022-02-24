import {Cell, Grid} from "@navikt/ds-react";
import {TilbakeKnapp} from "./tilbake-knapp";
import Neste from "./neste-knapp";
import {useRouter} from "next/router";

interface Knapperadprops {
    onNeste: () => void,
    skalViseForrigeKnapp: boolean,
    valgt?: string
}

export const Knapperad = (props: Knapperadprops) => {
    const router = useRouter();

    return (
        <Grid>
            {props.skalViseForrigeKnapp
                && <Cell xs={6}>
                    <TilbakeKnapp onclick={router.back}/>
                </Cell>
            }

            <Cell xs={6}>
                <Neste isValid={!!props.valgt} onClick={props.onNeste}/>
            </Cell>
        </Grid>
    )
}