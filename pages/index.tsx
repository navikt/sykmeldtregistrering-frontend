import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading } from '@navikt/ds-react'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Arbeidssøkerregistrering</title>
        <meta name="description" content="Registrer deg som arbeidssøker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading spacing size="xlarge" level="2">
        Registrer deg som arbeidssøker
      </Heading>
    </div>
  )
}

export default Home
