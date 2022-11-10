import { updateDoc, doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { db, auth, games, storage } from "@local/api";
import { Game as GameMetadata } from "@local/api/models";
import { toAlert, stringifyGameJSON } from "@local/api/functions";
import { Game as GameFormat } from "@local/classes/Game/formats";
import { isAlert } from "@local/functions";

function update(
    uid: string,
    options: {
        metadata?: Partial<GameMetadata>,
        format?: GameFormat,
        imageFile?: File
    }
): Promise<GameMetadata> {
    const {
        metadata = {},
        format,
        imageFile
    } = options;

    return new Promise(async (resolve, reject) => {
        try {
            const user = await auth.currentUser();
            if (!user) {
                return reject({
                    severity: "error",
                    message: "User not authenticated"
                });
            }

            const docRef = doc(db, games.collectionName, uid);
            const docSnap = await getDoc(docRef);
            const gameExists = docSnap.exists();
            if (!gameExists) {
                reject({
                    severity: "error",
                    message: "Game not found"
                });
            }

            const game = docSnap.data() as GameMetadata;
            if (game.createdBy !== user.uid) {
                reject({
                    severity: "error",
                    message: "You are not allowed to update this game"
                });
            }

            delete metadata.uid;
            delete metadata.image;
            delete metadata.createdAt;
            delete metadata.createdBy;
            delete metadata.url;

            if (imageFile) {
                const storageRef = ref(storage, `printscreens/${user.uid}/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);

                const url = await getDownloadURL(storageRef);
                metadata.image = url;
            }

            if (format) {
                const file = new File(
                    [stringifyGameJSON(format)],
                    `${uid}.json`,
                    { type: "application/json" }
                );

                const storageRef = ref(storage, `games/${user.uid}/${file.name}`);
                await uploadBytes(storageRef, file);

                const url = await getDownloadURL(storageRef);
                metadata.url = url;
            }

            await updateDoc(docRef, { ...metadata });

            resolve({ ...game, ...metadata });
        } catch (error) {
            if (isAlert(error)) {
                reject(error);
            } else {
                reject(toAlert(error as FirebaseError));
            }
        }
    });
}

export default update;