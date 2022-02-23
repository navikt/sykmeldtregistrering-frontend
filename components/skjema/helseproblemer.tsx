import lagHentTekstForSprak, {Tekster} from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import {Alert, Button, Heading, Link} from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import skjemaStyles from '../../styles/skjema.module.css';

const TEKSTER: Tekster<string> = {
  nb: {
    tittel: 'Har du helseproblemer som hindrer deg i å søke eller være i jobb?',
    ja: 'Ja',
    nei: 'Nei',
    fortellMer: 'Svarer du ja, kan du fortelle mer til en veileder i en oppfølgingssamtale. Vi kontakter deg når du har registrert deg.'

  }
};

const Helseproblemer = () => {
  const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

  const valg = [
    { tekst: tekst('ja'), value: 'ja' },
    { tekst: tekst('nei'), value: 'nei' },
  ];

  return (
      <>
        <Heading spacing size={'large'} level="1">
          {tekst('tittel')}
        </Heading>

        <form className="mbl">
          <RadioGruppe valg={valg} />
        </form>

        <Alert variant="info" inline={true}>{tekst('fortellMer')}</Alert>

        <div className={skjemaStyles.taCenter}>
          <Button>Neste</Button>
        </div>

        <div className={skjemaStyles.taCenter}>
          <Link href="#">Avbryt registreringen</Link>
        </div>
      </>
  );
}

export default Helseproblemer;
