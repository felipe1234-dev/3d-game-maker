// Firebase
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Local
import { toAlert } from "../functions";

export default function logIn(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password) 
            .then((resp: any) => {
                sessionStorage.setItem("Auth Token", resp._tokenResponse.refreshToken);
                sessionStorage.setItem("Assign Date", (new Date().getTime()).toString());
                
                resolve();
            })
            .catch((error: FirebaseError) => (
                reject(toAlert(error))
            ));
    });
};