import { NextPage } from 'next';
import Header from '../../components/header';
import DinSituasjon from '../../components/skjema/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/skjema/siste-jobb/siste-jobb';
import Utdanning from '../../components/skjema/utdanning';
import GodkjentUtdanning from '../../components/skjema/utdanning-godkjent';
import BestattUtdanning from '../../components/skjema/utdanning-bestatt';
import Helseproblemer from '../../components/skjema/helseproblemer';

interface SkjemaProps {
    side: number;
}

type SiderMap = { [key: number]: JSX.Element };

const siderMap: SiderMap = {
    0: <DinSituasjon />,
    1: <SisteJobb />,
    2: <Utdanning />,
    3: <GodkjentUtdanning />,
    4: <BestattUtdanning />,
    5: <Helseproblemer />
};

const hentKomponentForSide = (side: number) => {
    return siderMap[side] || siderMap[0];
};

const Skjema: NextPage<SkjemaProps> = (props) => {
    const { side } = props;

    return (
        <>
            <Header />
            <main className={styles.main}>{hentKomponentForSide(side)}</main>
        </>
    );
};

Skjema.getInitialProps = async (context: any) => {
    const { side } = context.query;

    return {
        side: Number(side),
    };
};

export default Skjema;
