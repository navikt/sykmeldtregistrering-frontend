import styles from './progress-bar.module.css';

interface Props {
    value: number;
    className?: string;
}

const hentBredde = (value: number) => {
    return value === 0 ? 2 : 100 * value; // gi 0 fremdrift 2% i start-bredde
};

const ProgressBar = (props: Props) => {
    return (
        <div className={`${styles.progress} ${props.className || ''}`}>
            <div
                style={{ width: `${hentBredde(props.value)}%` }}
                className={styles.progressBar}
                role="progressbar"
                aria-valuenow={props.value}
                aria-valuemin={0}
                aria-valuemax={1}
            />
        </div>
    );
};

export default ProgressBar;
