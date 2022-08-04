import { FirebaseError } from "firebase/app";
import { 
    addDoc, 
    collection,
    Timestamp,
    updateDoc
} from "firebase/firestore";
import { Media } from "@local/api/models";

import * as auth from "@local/api/auth";
import * as gallery from "./index";

import { db, storage } from "@local/api";
import { toAlert } from "@local/api/functions";

export default function add(
    props: {
        title: string, 
        description: string, 
        folders: string[],
        file: File
    }
): Promise<Media> {    
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
            
            const split = (text: string) => (
                text.replace(/[-_\s]/g, " ").replace(/\s+/g, " ").split(" ")
            );

            try {
                const user = await auth.currentUser();
                
                if (!!user) {
                    newMedia.createdBy = user.uid;
                    
                    newMedia.tags.push(user.uid, user.email);
                    newMedia.tags.push(...split(user.firstName));
                    newMedia.tags.push(...split(user.lastName));
                    newMedia.tags.push(...split(title));
                    newMedia.tags.push(...split(description));
                    newMedia.tags.push(...folders);
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
            
            const docRef = await addDoc(collectionRef, newMedia);
            await updateDoc(docRef, {
                uid: docRef.id,
                tags: [ docRef.id, ...newMedia.tags ]
            });

            try {
                const media = await gallery.byUid(docRef.id);

                resolve(media);
            } catch (error) {
                reject(error);
            }
        } catch (error) {
            reject(toAlert(error as FirebaseError))
        }
    });
};