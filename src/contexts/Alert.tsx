import { createContext, ReactNode, useEffect, useState, } from "react";
import { Severity } from "@local/types";
import i18n, { t } from "@local/i18n";

interface AlertValue {
    message: string|null,
    setMessage(msg: string|null): void,
    severity: Severity|null,
    setSeverity(severity: Severity|null): void 
}

const AlertContext = createContext<AlertValue>({
    message: null,
    setMessage: () => {},
    severity: null,
    setSeverity: () => {}
});

function AlertProvider(props: { children: ReactNode }) {
    const [message, setMessage]   = useState<string|null>(null);
    const [severity, setSeverity] = useState<Severity|null>("error");

    useEffect(() => {
        if (!message || !severity) {
            return;
        }

        switch (severity) {
            case "error": 
                console.error(
                    t("Error!"), 
                    message
                );
                break;
            case "warning": 
                console.warn(
                    t("Warning!"), 
                    message
                );
                break;
            case "info": 
                console.info(
                    t("Info!"), 
                    message
                );
                break;
            case "success": 
                console.log(
                    t("Success!"), 
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