import { setDoc, doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import {
    db,
    storage,
    auth,
    games,
} from "@local/api";
import {
    split,
    stringifyGameJSON,
    toAlert
} from "@local/api/functions";
import { Game as GameMetadata } from "@local/api/models";
import { Game as GameFormat } from "@local/classes/Game/formats";
import { isAlert } from "@local/functions";

function create(
    options: {
        imageFile: File,
        metadata: Partial<GameMetadata>,
        format: GameFormat
    }
): Promise<GameMetadata> {
    const {
        imageFile,
        metadata,
        format
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

            const docRef = doc(db, games.collectionName, format.uuid);
            const docSnap = await getDoc(docRef);
            const gameExists = docSnap.exists();
            if (gameExists) {
                reject({
                    severity: "error",
                    message: "Game already exists"
                });
            }

            delete metadata.uid;
            delete metadata.image;
            delete metadata.createdAt;
            delete metadata.createdBy;
            delete metadata.url;

            const game = new GameMetadata();
            game.uid = format.uuid;
            game.name = metadata.name || "";
            game.description = metadata.description || "";

            game.tags.push(...(metadata.tags || []));
            game.tags.push(game.uid);
            game.tags.push(...split(game.name));
            game.tags.push(...split(game.description));
            game.tags.push(user.uid, user.email);
            game.tags.push(...split(user.firstName));
            game.tags.push(...split(user.lastName));
            game.tags.push(
                new Date(game.createdAt.seconds)
                    .toLocaleDateString()
            );
            game.createdBy = user.uid;

            game.tags = game.tags.map(tag => tag.toLowerCase());


            const imageRef = ref(storage, `printscreens/${user.uid}/${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(imageRef);
            game.image = imageUrl;


            const formatFile = new File(
                [stringifyGameJSON(format)],
                `${game.uid}.json`,
                { type: "application/json" }
            );
            const formatRef = ref(storage, `games/${user.uid}/${formatFile.name}`);
            await uploadBytes(formatRef, formatFile);
            const formatUrl = await getDownloadURL(formatRef);
            game.url = formatUrl;


            await setDoc(docRef, { ...game });

            resolve(game);
        } catch (error) {
            if (isAlert(error)) {
                reject(error);
            } else {
                reject(toAlert(error as FirebaseError));
            }
        }
    });
}

export default create;