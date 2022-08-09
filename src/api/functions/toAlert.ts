import { Alert } from "@local/interfaces";
import { FirebaseError } from "firebase/app";
import i18n, { getLang } from "@local/i18n";
import { Severity } from "@local/types";

function toAlert(error: FirebaseError): Alert {
    const lang = getLang();
    const trans = (key: string) => i18n[lang]["api.functions.toAlert." + key] || key;

    let severity: Severity = "error";
    let message = `${trans("unknown-error")}: (${error.code}) ${error.message}`;

    switch (error.code) {
        // Extra
        case "permission-denied":
        // Auth
        case "auth/weak-password":
        case "auth/email-already-in-use":
        case "auth/wrong-password":
        case "auth/user-not-found":
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
        message: trans(error.code)
    };
}

export default toAlert;