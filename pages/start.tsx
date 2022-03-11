import { Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { SkjemaSide } from '../model/skjema';
import { RegistreringType } from '../model/registrering';

const { basePath } = getConfig().publicRuntimeConfig;

const getUrl = (path: string) => `${basePath}/${path}`;
const fetcher = async (path: string) => {
    const response = await fetch(getUrl(path), {
        credentials: 'include',
    });
    return await response.json();
};

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

    return (
        <div style={{ textAlign: 'center' }}>
            <Loader variant="neutral" size="2xlarge" title="venter..." />
        </div>
    );
};

export default Start;
