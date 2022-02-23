import lagHentTekstForSprak, {Tekster} from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';
import {Button, Heading, Link} from '@navikt/ds-react';
import RadioGruppe from '../radio-gruppe/radio-gruppe';
import skjemaStyles from '../../styles/skjema.module.css';

const TEKSTER: Tekster<string> = {
  nb: {
    tittel: 'Er utdanningen din godkjent i Norge?',
    ja: 'Ja',
    nei: 'Nei',
    vetIkke: 'Vet ikke',
  }
};

const GodkjentUtdanning = () => {
  const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

  const valg = [
    { tekst: tekst('ja'), value: 'ja' },
    { tekst: tekst('nei'), value: 'nei' },
    { tekst: tekst('vetIkke'), value: 'vetIkke' },
  ];

  return (
      <>
        <Heading spacing size={'large'} level="1">
          {tekst('tittel')}
        </Heading>

        <form className="mbl">
          <RadioGruppe valg={valg} />
        </form>

        <div className={skjemaStyles.taCenter}>
          <Button>Neste</Button>
        </div>

        <div className={skjemaStyles.taCenter}>
          <Link href="#">Avbryt registreringen</Link>
        </div>
      </>
  );
}

export default GodkjentUtdanning;
