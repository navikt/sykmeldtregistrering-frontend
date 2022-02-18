import { rest } from 'msw'

export const handlers = [
  rest.get('https://veilarbregistrering.party/startregistrering', (req, res, ctx) => {
    return res(
      ctx.json({
        underOppfolging: false,
        jobbetSeksAvTolvSisteManeder: false,
        registreringType: "SPERRET",
        servicegruppe: "IVURD",
        formidlingsgruppe: "IARBS",
        geografiskTilknytning: "0807",
        rettighetsgruppe: "IYT",
      })
    )
  })
]