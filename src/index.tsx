import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MasterProvider } from "./contexts";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <MasterProvider>
            <App />
        </MasterProvider>
    </React.StrictMode>
);