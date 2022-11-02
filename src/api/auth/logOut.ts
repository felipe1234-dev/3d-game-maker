import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { toAlert } from "../functions";

export default function logOut(): Promise<void> {
    return new Promise((resolve, reject) => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                localStorage.removeItem("Auth Token");
                localStorage.removeItem("Last Activity");

                resolve();
            })
            .catch((error: FirebaseError) => (
                reject(toAlert(error))
            ));
    });
};