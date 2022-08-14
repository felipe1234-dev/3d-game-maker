import ReactDOM from "react-dom/client";
import { 
    HashRouter as Router, 
    useLocation 
} from "react-router-dom";
import { 
    I18nProvider, 
    AlertProvider 
} from "./contexts";
import { routes } from "./consts";
import { Composer } from "./components";

import Root from "./Root";

import "./styles/reset.css";
import "./styles/base.scss";

const App = () => {
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
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Router>
        <App />
    </Router>
);