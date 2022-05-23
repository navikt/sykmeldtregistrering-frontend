# Metrikker

Vi har ulike metrikker for hvordan løsningen brukes av arbeidssøker og rent tekniske metrikker for hvordan løsningen har det i produksjon.

-   [Dashboard i Amplitude](https://analytics.amplitude.com/nav/dashboard/jbs02pj) for bruk av løsningen
-   [Dashboard i Grafana](https://grafana.nais.io/d/000000283/nais-app-dashbord?orgId=1&refresh=1m&var-interval=$__auto_interval_interval&var-datasource=prod-gcp&var-team=tbd&var-app=poa-arbeidssokerregistrering&var-namespace=paw&var-docker_image=c6938a0fe9fbc0cd6076ebb2ffa13e1069e6f4ce&var-ingress_url=All) teknisk

# Metrikker i Amplitude

Dersom du vil lage egne rapporter utover de som ligger på dashboardet er det satt målinger omkring følgende hendelser.

## Stoppsituasjoner

Situasjoner som gjør at arbeidssøkeren ikke får registrert seg.

Kan hentes ut ved å sjekke `arbeidssokerregistrering.stoppsituasjoner` og gruppere på `situasjon`.
På situasjonen `Arbeidssøkeren må reaktivere seg` kan du også gruppere på `brukergruppe` for å se hvilke grupper som møtte stoppsituasjonen

### Situasjoner

`Arbeidssøkeren må reaktivere seg`

Arbeidssøkeren har falt ut av NAV-systemet og det har gått kortere tid enn 28 dager siden det skjedde.
Her er det mulig å gruppere på `brukergruppe` for å se hvilken status arbeidssøkeren hadde før hen falt ut.

`Arbeidssøkeren mangler arbeidstillatelse eller er utvandret`

Denne kan skyldes at NAV ikke har oppdaterte opplysninger om arbeidssøkeren i vår systemer.
I de tilfellene må en veileder gjøre en manuell jobb for å oppdatere opplysningene.

`Arbeidssøkeren er allerede registrert`

Denne kommer opp for brukere som ikke får registrert seg på grunn av mismatch i baksystemene til NAV.
Det kan være at de er i gruppen IARBS eller annet.

`Arbeidssøkeren får en feilmelding`

Dette er en samlemelding over feilsituajoner hvor vi ikke kan gi en god forklaring på hva som har skjedd elelr hvordan den kan løses.
Typisk skjer dette ved uforutsette tekniske feil i baksystemene og hvor bruker bare får beskjed om å prøve igjen senere.

`Arbeidssøkeren får ikke registrert seg pga nedetid`

Denne vises dersom systemet er togglet av pga for eksempel planlagt vedlikehold av Arena.

## Brukeradferd

Målinger omkring brukeradferd.

Kan hentes ut ved å sjekke `arbeidssokerregistrering.aktiviteter` og `arbeidssokerregistrering.besvarelser`

-   Hvor lang tid bruker man på å fylle ut skjemaet?
-   Hvor mange treffer feilsituasjoner?
-   Hvor mange får registrert seg vellykket?
-   Hva svarer man på du ulike spørsmålene?
-   Hvilken flyt havner brukeren på?
-   Hva gjør de etter registrering?

### Aktiviteter

Kan hentes ut ved å sjekke `arbeidssokerregistrering.aktiviteter` og vil kunne grupperes på `aktivitet`.
Vil i noen tilfeller inneholde informasjon om `registreringstype` og `tidBruktForAaFullforeSkjema`

### Besvarelser

Kan hentes ut ved å sjekke `arbeidssokerregistrering.besvarelser` og grupperes på `sporsmalId`

## Eksperimenter

Egne målinger satt opp omkring eksperimenter vi kjører.

Kan hentes ut ved å sjekke `arbeidssokerregistrering.eksperimenter`.
Kan grupperes på `eksperiment` og vil i noen tilfeller også ha med info om `situasjon` og `brukergruppe`
