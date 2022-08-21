import { Alert } from "@local/interfaces";
import { FirebaseError } from "firebase/app";
import { t } from "@local/i18n";
import { Severity } from "@local/types";

function toAlert(error: FirebaseError): Alert {
    let severity: Severity = "error";
    let message = `${t("unknown-error")}: (${error.code}) ${error.message}`;

    switch (error.code) {
        // Extra
        case "permission-denied":
        // Auth
        case "auth/weak-password":
        case "auth/email-already-in-use":
        case "auth/wrong-password":
        case "auth/user-not-found":
        case "auth/too-many-requests":
            severity = "error";
            break;

        case "auth/network-request-failed":
        // Storage
        case "storage/object-not-found":
            severity = "warning";    
            break;

        default: 
            return ({
                severity,
                message
            });
    }

    return {
        severity,
        message: t(error.code)
    };
}

export default toAlert;