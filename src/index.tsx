// Libs
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

// Local components
import App from "./App";

// Providers
import { App as AppProvider } from "./providers";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <AppProvider>
        <Router>
            <App />
        </Router>
    </AppProvider>
);