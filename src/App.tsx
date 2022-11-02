import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import {
    AlertProvider,
    HistoryProvider,
    LoaderProvider,
} from "./contexts";
import { usePathPattern } from "./hooks";
import { getLang, t } from "./i18n";
import { Composer } from "./components";
import routes from "./consts/routes";

import Root from "./Root";

const commonProviders = [
    AlertProvider,
    HistoryProvider,
    LoaderProvider
];

function App() {
    const pathPattern = usePathPattern();
    const location = useLocation();

    const pageProviders = useMemo(
        () => {
            const page = routes.pages.find(page => page.path === pathPattern);
            return page?.providers || [];
        },
        [location]
    );

    const pageTitle = useMemo(
        () => {
            const page = routes.pages.find(page => page.path === pathPattern);
            return page?.pageTitle;
        },
        [location]
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
    }, [location]);

    const providers = [
        ...commonProviders,
        ...pageProviders
    ];

    return (
        <Composer components={providers}>
            <Root />
        </Composer>
    );
}

export default App;