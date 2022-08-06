import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toAlert } from "../functions";

export default function logIn(email: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth();
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            sessionStorage.setItem("Auth Token", userCredential.user.refreshToken);
            sessionStorage.setItem("Assign Date", (new Date().getTime()).toString());
            
            resolve();
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
};