import { setDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { db, auth, games, storage } from "@local/api";
import { Game } from "@local/api/models";
import { split, toAlert } from "@local/api/functions";
import { Game as GameFormat } from "@local/classes/Game/formats";

function replacer(key: string, value: any): any {
    if (value === Infinity) {
        return "Infinity";
    }

    return value;
}

/**
 * Serves to update and create new games.
 */
function save(format: GameFormat): Promise<Game> {
    return new Promise(async (resolve, reject) => {
        try {
            const game = new Game();

            game.uid = format.uuid;
            game.name = format.name;
            game.description = format.description;

            game.tags.push(game.uid);
            game.tags.push(...split(game.name));
            game.tags.push(...split(game.description));
            game.tags.push(
                new Date(game.createdAt.seconds)
                    .toLocaleDateString()
            );

            try {
                const user = await auth.currentUser();

                if (!!user) {
                    game.createdBy = user.uid;

                    game.tags.push(user.uid, user.email);
                    game.tags.push(...split(user.firstName));
                    game.tags.push(...split(user.lastName));
                } else {
                    reject({
                        severity: "error",
                        message: "User not authenticated"
                    });
                }
            } catch (error) {
                reject(error);
            }

            game.tags = game.tags.map(tag => tag.toLowerCase());

            const file = new File(
                [JSON.stringify(format, replacer)],
                `${game.uid}.json`,
                { type: "application/json" }
            );
                
            const storageRef = ref(storage, `games/${game.createdBy}/${file.name}`);
            await uploadBytes(storageRef, file);
    
            const url = await getDownloadURL(storageRef);
            game.url = url;
            
            const docRef = doc(db, games.collectionName, game.uid);
            const docSnap = await getDoc(docRef);
            
            const isNewGame = docSnap.exists();

            if (isNewGame) {
                await setDoc(docRef, { ...game });
            } else {
                game.createdAt = (docSnap.data() as Game).createdAt;
                await updateDoc(docRef, { ...game });
            }

            resolve(game);
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
}

export default save;