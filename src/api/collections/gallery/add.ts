import { FirebaseError } from "firebase/app";
import {
    addDoc,
    collection,
    Timestamp,
    updateDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Media } from "@local/api/models";

import * as auth from "@local/api/auth";
import * as gallery from "./index";

import { db, storage } from "@local/api";
import { toAlert, split } from "@local/api/functions";

export default function add(props: {
    title: string,
    description: string,
    folders: string,
    file: File
}): Promise<Media> {
    return new Promise(async (resolve, reject) => {
        const {
            title,
            description,
            folders,
            file
        } = props;

        const collectionRef = collection(db, gallery.collectionName);
        const newMedia = new Media();

        try {
            newMedia.mimeType = file.type;
            newMedia.extension = file.name.replace(/^.+\.(\w+)$/g, "$1");
            newMedia.createdAt = Timestamp.now();
            newMedia.folders = folders;
            newMedia.description = description;
            newMedia.title = title;

            try {
                const user = await auth.currentUser();

                if (!!user) {
                    newMedia.createdBy = user.uid;

                    newMedia.tags.push(user.uid, user.email);
                    newMedia.tags.push(...split(user.firstName));
                    newMedia.tags.push(...split(user.lastName));
                    newMedia.tags.push(...split(title));
                    newMedia.tags.push(...split(description));
                    newMedia.tags.push(...folders.split("/"));
                    newMedia.tags.push(newMedia.mimeType, newMedia.extension);
                    newMedia.tags.push(
                        new Date(newMedia.createdAt.seconds * 1000)
                            .toLocaleDateString()
                    );
                } else {
                    reject({
                        severity: "error",
                        message: "User not authenticated"
                    });
                }
            } catch (error) {
                reject(error);
            }

            const storageRef = ref(storage, `${folders}/${file.name}`);
            await uploadBytes(storageRef, file);

            const url = await getDownloadURL(storageRef);
            newMedia.url = url;

            const docRef = await addDoc(collectionRef, { ...newMedia });
            const theOtherTags = newMedia.tags.map(tag => tag.toLowerCase());

            await updateDoc(docRef, {
                uid: docRef.id,
                tags: [docRef.id, ...theOtherTags]
            });

            newMedia.uid = docRef.id;
            newMedia.tags = [docRef.id, ...theOtherTags];

            resolve(newMedia);
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
};