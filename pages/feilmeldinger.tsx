import {
    FeilmeldingDodUtvandretEllerForsvunnet,
    FeilmeldingGenerell,
    FeilmeldingNoeGikkGalt,
} from '../components/feilmeldinger/feilmeldinger';

const Feilmeldinger = () => {
    return (
        <div style={{ maxWidth: '70vw', margin: '0 auto' }}>
            <FeilmeldingGenerell />
            <br />
            <br />
            <FeilmeldingNoeGikkGalt />
            <br />
            <br />
            <FeilmeldingDodUtvandretEllerForsvunnet />
        </div>
    );
};

export default Feilmeldinger;
