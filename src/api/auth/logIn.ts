import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { toAlert } from "../functions";

export default function logIn(email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem("Auth Token", userCredential.user.refreshToken);
            localStorage.setItem("Last Activity", (new Date().getTime()).toString());

            resolve(userCredential);
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
};