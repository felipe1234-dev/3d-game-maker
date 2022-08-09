import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { App as AppProvider } from "@local/providers";
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Router>
        <AppProvider>
            <App />
        </AppProvider>
    </Router>
);