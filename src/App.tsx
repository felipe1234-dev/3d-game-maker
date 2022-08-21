import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getLang } from "./i18n";
import { routes } from "./consts";
import { Composer } from "./components";
import { AlertProvider } from "./contexts";

import Root from "./Root";

function App() {
    const { pathname } = useLocation();

    const providers = routes.pages.filter(item => (
        pathname.includes(item.path)
    )).reduce((resu: Function[], item) => {
        resu.push(...item.providers);
        return resu;
    }, []);

    useEffect(() => {
        const lang = getLang();

        if (!lang) {
            return;
        }

        const langInHTML = lang.replace("_", "-");
        document.querySelector("html")?.setAttribute("lang", langInHTML);
    }, [pathname]);

    return (
        <Composer components={[
            AlertProvider,
            ...providers
        ]}>
            <Root />
        </Composer>
    );
}

export default App;