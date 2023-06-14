# sykmeldtregistrering-frontend

Arbeidssøkerregistrering

## Demo

[https://arbeid.ekstern.dev.nav.no/syk/mer-oppfolging](https://arbeid.ekstern.dev.nav.no/syk/mer-oppfolging)

# Utvikling

Bruk Node.js 18 `nvm use` (dersom du bruker nvm til versjonshåndtering av Node.js).

Dersom du ikke kjører i mock-modus må du ha koblet til [naisdevice](https://doc.nais.io/device/) for å nå noen av endepunktene.

Siden noen av modulene hentes fra GitHubs package registry må du også gjøre litt ekstra konfigurasjon for å kjøre løsningen lokalt.

-   Opprett et PAT (github => settings => developer settings => personal access tokens => tokens (classic)) med `read:packages` scope
-   Konfigurer SSO mot NAVIKT for tokenet
-   bruk tokenet som passord ved login `npm login --registry https://npm.pkg.github.com`

Deretter fortsette du med

-   klon repo
-   innstaller avhengigheter `npm i`
-   kjør tester `npm t`
-   start utviklingsserver `npm run dev`
-   åpne nettleseren på `http://localhost:3000/syk/mer-oppfolging`

## Deploye kun til dev

Ved å prefikse branch-navn med `dev/`, så vil branchen kun deployes i dev.

```
git checkout -b dev/<navn på branch>
```

For å teste løsningen i dev bruker du [https://arbeid.intern.dev.nav.no/syk/mer-oppfolging](https://arbeid.intern.dev.nav.no/syk/mer-oppfolging)

## Ekstern dokumentasjon

-   [Next.js](https://nextjs.org/)
-   [testing-library](https://testing-library.com/)

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#team-paw-dev](https://nav-it.slack.com/archives/CLTFAEW75)
