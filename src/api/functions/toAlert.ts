import { Alert } from "@local/interfaces";
import { FirebaseError } from "firebase/app";

function toAlert(error: FirebaseError): Alert {
    switch (error.code) {
        // Extra
        case "permission-denied": 
            return ({
                severity: "error",
                message: "Session expired (max duration: 1h). Reload the page and log in again."
            });
        
        // Auth
        case "auth/weak-password":
            return ({
                severity: "error",
                message: "Password should be at least 6 characters."
            });

        case "auth/network-request-failed":
            return ({
                severity: "warning",
                message: "Your Internet connection might be slow. Please, try again later."
            });
        
        case "auth/email-already-in-use":
            return ({
                severity: "error",
                message: "Email already in use. Choose another email."
            });  
        
        case "auth/wrong-password":
            return ({
                severity: "error",
                message: "Wrong password. Check your password."
            });
    
        case "auth/user-not-found":
            return ({
                severity: "error",
                message: "User not found. Maybe you don't have an account?"
            });
            
        // Storage
        case "storage/object-not-found":
            return ({
                severity: "warning",
                message: "File not found."
            });
            
        default: 
            return ({
                severity: "error",
                message: `Unknown error: (${error.code}) ${error.message}`
            });
    }
}

export default toAlert;