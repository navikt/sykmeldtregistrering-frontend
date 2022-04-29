# Metrikker

Vi har ulike metrikker for hvordan løsningen brukes av arbeidssøker og rent tekniske metrikker for hvordan løsningen har det i produksjon.

-   [Dashboard i Amplitude](https://analytics.amplitude.com/nav/dashboard/jbs02pj) for bruk av løsningen
-   [Dashboard i Grafana](https://grafana.nais.io/d/000000283/nais-app-dashbord?orgId=1&refresh=1m&var-interval=$__auto_interval_interval&var-datasource=prod-gcp&var-team=tbd&var-app=poa-arbeidssokerregistrering&var-namespace=paw&var-docker_image=c6938a0fe9fbc0cd6076ebb2ffa13e1069e6f4ce&var-ingress_url=All) teknisk

# Metrikker i Amplitude

Dersom du vil lage egne rapporter utover de som ligger på dashboardet er det satt målinger omkring følgende hendelser.

## Stoppsituasjoner

Situasjoner som gjør at arbeidssøkeren ikke får registrert seg

Kan hentes ut ved å sjekke `arbeidssokerregistrering.stoppsituasjoner` og gruppere på `situasjon`

-   vedlikehold av Arena
    -   midlertidig
-   teknisk feil
    -   midlertidig
-   Feil som skyldes NAV-interne systemer
    -   IARBS + oppfølging men ikke registrert som arbeidssøker
        -   noen må gjøre en manuell jobb i Arena
    -   mangler arbeidstillatelse i Arena
        -   noen må gjøre en manuell jobb i Arena
    -   utvandret
        -   noen må gjøre en manuell jobb i Arena
-   antall reaktiveringer
    -   som søker gjenopptak

## Brukeradferd

Målinger omkring brukeradferd.

Kan hentes ut ved å sjekke `arbeidssokerregistrering.aktiviteter` og `arbeidssokerregistrering.besvarelser`

-   Hvor lang tid bruker man på å fylle ut skjemaet?
-   Hvor mange treffer feilsituasjoner?
-   Hvor mange får registrert seg vellykket?
-   Hva svarer man på du ulike spørsmålene?
-   Hvilken flyt havner brukeren på?
-   Hva gjør de etter registrering?
