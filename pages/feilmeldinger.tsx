import { FeilmeldingGenerell, FeilmeldingNoeGikkGalt } from '../components/feilmeldinger/feilmeldinger';
import KontaktVeileder from './veiledning/[situasjon]';

const Feilmeldinger = () => {
    return (
        <div style={{ maxWidth: '70vw', margin: '0 auto' }}>
            <FeilmeldingGenerell />
            <br />
            <br />
            <FeilmeldingNoeGikkGalt />
            <br />
            <br />
            <KontaktVeileder situasjon="utvandret" />
            <br />
            <br />
            <KontaktVeileder situasjon="mangler-arbeidstillatelse" />
        </div>
    );
};

export default Feilmeldinger;
