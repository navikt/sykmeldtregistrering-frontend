import { NextPage } from 'next';
import Header from '../../components/header';
import DinSituasjon from '../../components/din-situasjon/din-situasjon';
import styles from '../../styles/skjema.module.css';

const Skjema: NextPage = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
              <DinSituasjon />
            </main>
        </>
    );
};

export default Skjema;
