import React from "react";
import { Severity } from "@local/types";

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
    
    React.useEffect(() => {
        if (!message || !severity) {
            return;
        }
        
        switch (severity) {
            case "error": 
                console.error("Error!", message);
                break;
            case "warning": 
                console.warn("Warning!", message);
                break;
            case "info": 
                console.info("Info!", message);
                break;
            case "success": 
                console.log("Success!", message);
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