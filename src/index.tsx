import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";

import "./styles/reset.css";
import "./styles/base.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <HashRouter>
        <App />
    </HashRouter>
);