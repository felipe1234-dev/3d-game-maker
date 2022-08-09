import React from "react";
import { useLocation } from "react-router-dom";
import i18n, { getLang } from "@local/i18n";

const I18nContext = React.createContext<{
    get: (key: string, fallback?: string) => string,
    use: (scope: string) => void,
    lang: () => string
}>({
    get: () => "",
    use: () => {},
    lang: () => ""
});

function I18nProvider(props: { children: React.ReactNode }) {
    const [translations, setTranslations] = React.useState<{ [key: string]: string }>({});
    const [scope, setScope] = React.useState<string>("");
    const { pathname } = useLocation();

    const lang = getLang();

    const getTranslation = (key: string, fallback?: string) => (
        translations[scope + key] || i18n[fallback ?? "en_US"][scope + key] || fallback || key
    );

    const useScope = (scope: string) => {
        setScope(scope + ".");
    };

    React.useEffect(() => {
        if (!lang) {
            return;
        }
        
        const trans = i18n[lang];
        setTranslations(trans);

        const langInHTML = lang.replace("_", "-");
        document.querySelector("html")?.setAttribute("lang", langInHTML);
    }, [pathname]);
    
    return (
        <I18nContext.Provider value={{
            get: getTranslation,
            use: useScope,
            lang: getLang
        }}>
            {props.children}
        </I18nContext.Provider>
    );
}

export { I18nContext, I18nProvider };