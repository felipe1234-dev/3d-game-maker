import React from "react";
import { Severity } from "@local/types";
import { I18nContext } from "./index";

interface AlertValue {
    message: string|null,
    setMessage(msg: string|null): void,
    severity: Severity|null,
    setSeverity(severity: Severity|null): void 
}

const AlertContext = React.createContext<AlertValue>({
    message: null,
    setMessage: () => {},
    severity: null,
    setSeverity: () => {}
});

function AlertProvider(props: { children: React.ReactNode }) {
    const [message, setMessage]   = React.useState<string|null>(null);
    const [severity, setSeverity] = React.useState<Severity|null>("error");
    
    const i18n = React.useContext(I18nContext);
    const scope = "contexts.alert.";

    React.useEffect(() => {
        if (!message || !severity) {
            return;
        }

        switch (severity) {
            case "error": 
                console.error(
                    i18n.get(scope + "error"), 
                    message
                );
                break;
            case "warning": 
                console.warn(
                    i18n.get(scope + "warning"), 
                    message
                );
                break;
            case "info": 
                console.info(
                    i18n.get(scope + "info"), 
                    message
                );
                break;
            case "success": 
                console.log(
                    i18n.get(scope + "success"), 
                    message
                );
                break;
        }
    }, [message, severity])
    
    return (
        <AlertContext.Provider value={{
            message,
            setMessage,
            severity,
            setSeverity
        }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export { AlertContext, AlertProvider };
export type { AlertValue };