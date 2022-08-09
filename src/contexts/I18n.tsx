import React from "react";
import { useParams, useLocation } from "react-router-dom";
import i18n from "@local/i18n";

const I18nContext = React.createContext<{
    get: (key: string, fallback?: string) => string,
    use: (scope: string) => void
}>({
    get: () => "",
    use: () => {}
});

function I18nProvider(props: { children: React.ReactNode }) {
    const [translations, setTranslations] = React.useState<{
        [key: string]: string
    }>({});
    const [scope, setScope] = React.useState<string>("");

    const { lang } = useParams();
    const { pathname } = useLocation();
    
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
        
        const fixedLang = lang.replace("-", "_").replace(/_(\w+)$/g, m => m.toUpperCase());
        let trans = i18n[fixedLang];
        
        if (!trans) {
            const closestMatch = Object.keys(i18n).find(langItem => (
                langItem.includes(fixedLang) || fixedLang.includes(langItem)
            ));
            
            if (closestMatch) {
                trans = i18n[closestMatch];
            }
        }

        if (trans) {
            setTranslations(trans);
            const langAttr = fixedLang.replace("_", "-");
            document.querySelector("html")?.setAttribute("lang", langAttr);
        }
    }, [pathname]);
    
    return (
        <I18nContext.Provider value={{
            get: getTranslation,
            use: useScope
        }}>
            {props.children}
        </I18nContext.Provider>
    );
}

export { I18nContext, I18nProvider };