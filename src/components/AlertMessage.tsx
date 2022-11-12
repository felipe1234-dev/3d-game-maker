import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { Severity } from "@local/types";

interface AlertMessageProps {
    open?: boolean,
    type?: Severity,
    children?: React.ReactNode,
    message?: string|null, 
    duration?: number,
    onClose?: Function
}

function AlertMessage({
    open = true,
    type = "error",
    children,
    message,
    duration = 3000,
    onClose
}: AlertMessageProps) {
    const handleOnClose = (event: Event | React.SyntheticEvent) => {
        if (onClose) {
            onClose(event);
        }
    }
    
    return (
        <Snackbar
            onClose={handleOnClose}
            autoHideDuration={duration}
            open={open}
        >
            <Alert
                severity={type}
                sx={{ width: "100%" }}
                onClose={handleOnClose}
            >
                {message && message}
                {children && children}
            </Alert>
        </Snackbar>
    );
}

export default AlertMessage;
export type { AlertMessageProps };