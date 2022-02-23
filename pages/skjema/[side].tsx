import { NextPage } from 'next';
import Header from '../../components/header';
import DinSituasjon from '../../components/din-situasjon/din-situasjon';
import styles from '../../styles/skjema.module.css';
import SisteJobb from '../../components/siste-jobb/siste-jobb';
import Utdanning from '../../components/utdanning/utdanning';
import GodkjentUtdanning from '../../components/utdanning/godkjent';
import BestattUtdanning from '../../components/utdanning/bestatt';

interface SkjemaProps {
    side: number;
}

type SiderMap = { [key: number]: JSX.Element };

const siderMap: SiderMap = {
    0: <DinSituasjon />,
    1: <SisteJobb />,
    2: <Utdanning />,
    3: <GodkjentUtdanning />,
    4: <BestattUtdanning />
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
