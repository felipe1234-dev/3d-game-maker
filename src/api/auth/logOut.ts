import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { toAlert } from "../functions";

export default function logOut(): Promise<void> {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        
        signOut(auth)
            .then(() => {
                sessionStorage.removeItem("Auth Token");
                sessionStorage.removeItem("Assign Date");
                
                resolve();
            })
            .catch((error: FirebaseError) => (
                reject(toAlert(error)) 
            ));
    }); 
};