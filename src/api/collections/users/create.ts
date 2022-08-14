import { setDoc, doc } from "firebase/firestore";
import { User } from "@local/api/models";
import { split, toAlert } from "@local/api/functions";
import * as users from "./index";
import { db } from "@local/api";
import { FirebaseError } from "firebase/app";

export default function create(props: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
        const user = props;

        user.tags.push(user.uid, user.email);
        user.tags.push(...split(user.firstName));
        user.tags.push(...split(user.lastName));
        user.tags.push(
            new Date(user.createdAt.seconds * 1000)
                .toLocaleDateString()
        );

        user.tags = user.tags.map(tag => tag.toLowerCase());

        try {
            const docRef = doc(db, users.collectionName, user.uid);
            await setDoc(docRef, { ...user });
            
            resolve(user);
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
};