import { Firestore, getDoc, doc } from "firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { collectionName } from "./index";
import { Media } from "@local/api/models";
import { toAlert } from "@local/api/functions";

function byUid(db: Firestore, uid: string): Promise<Media> {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(db, `${collectionName}/${uid}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                resolve({ ...docSnap.data() } as Media);
            } else {
                reject({
                    severity: "error",
                    message: "Media file does not exist"
                });
            }
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
}

export default byUid;