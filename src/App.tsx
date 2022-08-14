import { useLocation } from "react-router-dom";
import { routes } from "@local/consts";
import { Composer } from "@local/components";
import { I18nProvider, AlertProvider } from "@local/contexts";
import Root from "./Root";

function App() {
    const { pathname } = useLocation();

    const providers = routes.pages.filter(item => (
        pathname.includes(item.path)
    )).reduce((resu: Function[], item) => {
        resu.push(...item.providers);
        return resu;
    }, []);

    return (
        <Composer components={[
            I18nProvider,
            AlertProvider,
            ...providers
        ]}>
            <Root />
        </Composer>
    );
}

export default App;