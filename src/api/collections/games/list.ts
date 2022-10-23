import { getDocs } from "firebase/firestore";
import { FirebaseError } from "@firebase/util";

import { collectionName } from "./index";
import { Filter } from "@local/interfaces";
import { Game } from "@local/api/models";
import { generateQuery, toAlert } from "@local/api/functions";
import { db } from "@local/api";

function list(filter: Filter = {}): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const q = await generateQuery(db, collectionName, filter);
            const resp = await getDocs(q);
            const docs = resp.docs.map(doc => ({ ...doc.data() }));

            resolve(docs as Game[]);
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
}

export default list;