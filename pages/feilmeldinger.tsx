import {
    FeilmeldingDodUtvandretEllerForsvunnet,
    FeilmeldingGenerell,
    FeilmeldingManglerArbeidstillatelse,
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
            <br />
            <br />
            <FeilmeldingManglerArbeidstillatelse />
        </div>
    );
};

export default Feilmeldinger;