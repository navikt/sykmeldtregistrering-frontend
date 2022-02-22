import { NextPage } from 'next';
import Header from '../../components/header';
import DinSituasjon from '../../components/din-situasjon/din-situasjon';
import styles from '../../styles/skjema.module.css';

interface SkjemaProps {
  side: number;
}

const Skjema: NextPage<SkjemaProps> = (props) => {
    return (
        <>
            <Header />
            <main className={styles.main}>
              <DinSituasjon />
            </main>
        </>
    );
};

Skjema.getInitialProps = async (context: any) => {
  const {side} = context.query;

  return {
    side: Number(side)
  }
}

export default Skjema;
