import {Alert, Button} from "@navikt/ds-react";
import skjemaStyles from "../../styles/skjema.module.css";

export const TilbakeKnapp = (props: {onclick: () => void}) => {

    return (
        <>
            <div className={skjemaStyles.taCenter}>
                <Button variant="secondary" onClick={props.onclick}> Tilbake </Button>
            </div>
        </>
    );
}