import { Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SkjemaSide } from '../model/skjema';
import { Formidlingsgruppe, RegistreringType } from '../model/registrering';
import { fetcher } from '../lib/api-utils';

const DITT_NAV_URL = process.env.NEXT_PUBLIC_DITTNAV_URL;

function skalVideresendesTilDittNAV(data: any) {
    const { formidlingsgruppe, underOppfolging } = data;
    return formidlingsgruppe === Formidlingsgruppe.ARBS && underOppfolging === true;
}

function hentNesteSideUrl(data: any) {
    const { registreringType } = data;

    switch (registreringType) {
        case RegistreringType.ORDINAER_REGISTRERING: {
            return `/skjema/${SkjemaSide.DinSituasjon}`;
        }
        case RegistreringType.SYKMELDT_REGISTRERING: {
            return `/sykmeldt/${SkjemaSide.SykmeldtFremtidigSituasjon}`;
        }
        case RegistreringType.REAKTIVERING: {
            return '/reaktivering';
        }
        case RegistreringType.SPERRET: {
            return '/sperret';
        }
        case RegistreringType.ALLEREDE_REGISTRERT: {
            if (skalVideresendesTilDittNAV(data)) {
                return `${DITT_NAV_URL}?goTo=registrering`;
            }
            return '/veiledning/allerede-registrert';
        }
        default:
            return '/';
    }
}

const Start = () => {
    const { data, error } = useSWR('/api/startregistrering', fetcher);
    const router = useRouter();

    useEffect(() => {
        if (!data) {
            return;
        }

        router.push(hentNesteSideUrl(data));
    }, [data]);

    useEffect(() => {
        if (error) {
            router.push('/feil/');
        }
    }, [error]);

    return (
        <div style={{ textAlign: 'center' }}>
            <Loader variant="neutral" size="2xlarge" title="venter..." />
        </div>
    );
};

export default Start;
