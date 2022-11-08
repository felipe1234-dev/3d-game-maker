import { FirebaseError } from "firebase/app";
import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import { collectionName } from "./index";
import * as auth from "@local/api/auth";
import { toAlert } from "@local/api/functions";
import { User } from "@local/api/models";
import { db } from "@local/api";

export default function update(uid: string, updates: Partial<User>): Promise<User> {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, collectionName, uid);

        // For safety
        delete updates.uid;
        delete updates.createdAt;

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                try {
                    const authUser = await auth.currentUser();

                    if (!!authUser) {
                        if (authUser.uid === uid || authUser.admin) {
                            try {
                                await updateDoc(docRef, updates);
                                resolve({ ...docSnap.data() } as User);
                            } catch (error) {
                                const err = error as FirebaseError;
                                reject(toAlert(err));
                            }
                        } else {
                            reject({
                                severity: "error",
                                message: "You're trying to update a user who isn't you. Only admins can update data from users other than them."
                            });
                        }
                    } else {
                        reject({
                            severity: "error",
                            message: "User not authenticated"
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                reject({
                    severity: "error",
                    message: "User doesn't exist"
                });
            }
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
};