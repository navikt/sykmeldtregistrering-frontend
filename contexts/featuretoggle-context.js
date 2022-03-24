import { createContext, useContext, useEffect, useState } from 'react';

const FeatureToggleContext = createContext();

function FeatureToggleProvider({ children }) {
    const [toggles, setToggles] = useState({});

    useEffect(() => {
        const fetchToggles = async () => {
            const url = process.env.NEXT_PUBLIC_FEATURETOGGLES_URL;
            const response = await fetch(url);

            const json = await response.json();
            const aktiveFeatures = json.reduce((features, feature) => {
                if (feature.enabled) {
                    features[feature.name] = true;
                }
                return features;
            }, {});
            setToggles(aktiveFeatures);
        };

        fetchToggles();
    }, []);

    return <FeatureToggleContext.Provider value={{ toggles }}>{children}</FeatureToggleContext.Provider>;
}

function useFeatureToggles() {
    const context = useContext(FeatureToggleContext);
    if (context === undefined) {
        throw new Error('useFeatureToggles må brukes under en FeatureToggleProvider');
    }
    return context;
}

export { FeatureToggleProvider, useFeatureToggles };
