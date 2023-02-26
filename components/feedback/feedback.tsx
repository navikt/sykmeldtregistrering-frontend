import { useRef, useState, SyntheticEvent } from 'react';
import { BodyShort, Button, Detail, Popover } from '@navikt/ds-react';
import { nanoid } from 'nanoid';
import styles from './feedback.module.css';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import { loggFeedback } from '../../lib/amplitude';

const TEKSTER: Tekster<string> = {
    nb: {
        varDetteNyttig: 'Var dette nyttig å lese?',
        ja: 'Ja',
        nei: 'Nei',
        hvorforNei: 'Hvorfor svarte du nei?',
        gammeltNytt: 'Visste det fra før',
        forstodIkke: 'Forstår ikke innholdet',
        uviktig: 'Føles ikke viktig',
        andreGrunner: 'Andre grunner',
        vetIkke: 'Vet ikke',
    },
    en: {
        varDetteNyttig: 'Was this information useful?',
        ja: 'Yes',
        nei: 'No',
        hvorforNei: 'Why did you answer No?',
        gammeltNytt: 'I already knew this',
        forstodIkke: 'I did not understand it',
        uviktig: 'Felt unimportant',
        andreGrunner: 'Other reasons',
        vetIkke: 'Uncertain',
    },
};

interface Props {
    id: string;
    className?: string;
    sporsmal?: string;
}
function Feedback({ id, sporsmal, className }: Props) {
    const [valgt, setValgt] = useState('');
    const [visPopover, setVisPopover] = useState<boolean>(false);
    const feedbackNeiKnappRef = useRef<HTMLButtonElement>(null);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    const neiId = nanoid();

    const handleFeedback = (feedback: string, event: SyntheticEvent) => {
        loggFeedback({ id: id, feedback: feedback });
        setValgt(feedback);
        setVisPopover(feedback === 'nei');
    };

    return (
        <div className={`${className ? className : ''} ${styles.feedbackContainer}`}>
            <Detail className={styles.feedbackTittel}>{sporsmal ? sporsmal : tekst('varDetteNyttig')}</Detail>
            <div className={styles.valg}>
                <Button
                    size="xsmall"
                    variant="secondary"
                    onClick={(event) => handleFeedback('ja', event)} //className={jaKnapp}
                >
                    <Detail>{tekst('ja')}</Detail>
                </Button>
                <span className={styles.feedbackSpace} aria-hidden="true">
                    |
                </span>
                <Button
                    size="xsmall"
                    variant="secondary"
                    onClick={(event) => handleFeedback('nei', event)}
                    id={neiId}
                    ref={feedbackNeiKnappRef}
                >
                    <Detail>{tekst('nei')}</Detail>
                </Button>
                <Popover
                    id={`popover-${neiId}`}
                    anchorEl={feedbackNeiKnappRef.current}
                    onClose={() => setVisPopover(false)}
                    open={visPopover}
                    tabIndex={-1}
                    arrow={false}
                    placement={'top'}
                >
                    <Popover.Content>
                        <BodyShort className={styles.feedbackUtdyping}>{tekst('hvorforNei')}</BodyShort>
                        <ul className={styles.feedbackGrunner}>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - visste det fra før', event)}>
                                    {tekst('gammeltNytt')}
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - forstår ikke innholdet', event)}>
                                    {tekst('forstodIkke')}
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - føles ikke viktig', event)}>
                                    {tekst('uviktig')}
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - andre grunner', event)}>
                                    {tekst('andreGrunner')}
                                </button>
                            </li>
                        </ul>
                    </Popover.Content>
                </Popover>
                <span className={styles.feedbackSpace} aria-hidden="true">
                    |
                </span>
                <Button size="xsmall" variant="secondary" onClick={(event) => handleFeedback('vet ikke', event)}>
                    <Detail>{tekst('vetIkke')}</Detail>
                </Button>
            </div>
        </div>
    );
}

export default Feedback;
