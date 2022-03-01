import { rest } from 'msw';

export const handlers = [
    rest.get('https://veilarbregistrering.party/startregistrering', (req, res, ctx) => {
        return res(
            ctx.json({
                underOppfolging: false,
                jobbetSeksAvTolvSisteManeder: false,
                registreringType: 'SPERRET',
                servicegruppe: 'IVURD',
                formidlingsgruppe: 'IARBS',
                geografiskTilknytning: '0807',
                rettighetsgruppe: 'IYT',
            })
        );
    }),
    rest.get('https://veilarbregistrering.party/sistearbeidsforhold', (req, res, ctx) => {
        return res(
            ctx.json({
                arbeidsgiverOrgnummer: '123456789',
                styrk: '2130123',
                fom: '2019-02-01T12:00:00+01:00',
                tom: null,
            })
        );
    }),
    rest.get('https://www.nav.no/arbeid/registrering/pam-janzz/rest/kryssklassifiserMedKonsept', (req, res, ctx) => {
        return res(
            ctx.json({ konseptMedStyrk08List: [{ konseptId: 22490, label: 'IT-konsulent', styrk08: ['2511'] }] })
        );
    }),
];
