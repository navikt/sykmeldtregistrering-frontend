import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import useSWR from 'swr';

import { fetcher } from '../lib/api-utils';
import { Config } from '../model/config';

type uninitializedConfig = {};

const ConfigContext = createContext<Config | uninitializedConfig>({});

function ConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState();
    const { data } = useSWR('api/config/', fetcher);

    useEffect(() => {
        if (data) {
            setConfig(data);
        }
    }, [data]);

    return <ConfigContext.Provider value={config ?? {}}>{children}</ConfigContext.Provider>;
}

function useConfig() {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig må brukes under en ConfigProvider');
    }

    return context;
}

export { ConfigProvider, useConfig };
