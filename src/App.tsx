import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { getLang, t } from "./i18n";
import { Composer } from "./components";
import {
    AlertProvider,
    HistoryProvider,
    LoaderProvider,
} from "./contexts";

import routes from "./consts/routes";
import Root from "./Root";

function App() {
    const { pathname } = useLocation();

    const providers = useMemo(
        () =>
            routes.pages
                .filter(item => pathname.includes(item.path))
                .reduce((resu, item) => {
                    resu.push(...item.providers);
                    return resu;
                }, [] as Function[]),
        [pathname]
    );

    const pageTitle = useMemo(
        () =>
            routes.pages.find(item => pathname.includes(item.path))?.pageTitle,
        [pathname]
    );

    useEffect(() => {
        const lang = getLang();
        const langInHTML = lang.replace("_", "-");

        document.querySelector("html")?.setAttribute("lang", langInHTML);

        if (!pageTitle) {
            return;
        }

        document.title = t(pageTitle);

        localStorage.setItem(
            "Last Activity",
            new Date().getTime().toString()
        );
    }, [pathname]);

    return (
        <Composer
            components={[
                AlertProvider,
                HistoryProvider,
                LoaderProvider,
                ...providers
            ]}
        >
            <Root />
        </Composer>
    );
}

export default App;