import { FeilmeldingTrengerVeiledning } from '../../components/feilmeldinger/feilmeldinger';

export type Situasjon = 'utvandret' | 'mangler-arbeidstillatelse';

const Veiledning = (props: { situasjon: Situasjon }) => {
    return <FeilmeldingTrengerVeiledning manglerArbeidsTillatelse={props.situasjon === 'mangler-arbeidstillatelse'} />;
};

Veiledning.getInitialProps = async (context: any) => {
    const { situasjon } = context.query;

    return { situasjon };
};
