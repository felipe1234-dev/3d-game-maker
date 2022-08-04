// Firebase
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Firestore } from "@firebase/firestore";

// Local
import { User } from "@local/api/models";
import * as users from "../collections/users";
import logOut from "./logOut";

export default function currentUser(db: Firestore): Promise<User | null> {
    return new Promise((resolve, reject) => {
        const refreshToken = sessionStorage.getItem("Auth Token");
        const auth = getAuth();

        if (!!refreshToken) {
            const tokenDate = Number(sessionStorage.getItem("Assign Date"));
            const timeNow = new Date().getTime();
            const minutesPassed = (timeNow - tokenDate) / (1000 * 60);

            if (minutesPassed > 60) {
                logOut().catch((error) => (
                    reject(error)
                ));
            }
        } else {
            logOut().catch((error) => (
                reject(error)
            )); 
        }
        
        onAuthStateChanged(auth, (user) => {            
            if (!!user) {
                const { uid } = user; 
                
                users.byUid(db, uid)
                    .then((user) => (
                        resolve(user)
                    ))
                    .catch((error) => (
                        reject(error)
                    ));
            } else {
                resolve(null);
            }
        });        
    });
};