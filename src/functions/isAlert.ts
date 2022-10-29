import { Alert } from "@local/interfaces";

function isAlert(obj: any): obj is Alert {
    return (
        obj instanceof Object &&
        ["error", "warning", "info", "success"].includes(obj.severity) &&
        typeof obj.message === "string"
    );
}

export default isAlert;