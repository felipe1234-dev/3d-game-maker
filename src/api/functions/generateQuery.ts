import { 
    collection, 
    doc, 
    Firestore, 
    getDoc, 
    limit, 
    orderBy, 
    query, 
    QueryConstraint, 
    startAfter, 
    where 
} from "firebase/firestore";
import { Filter } from "@local/interfaces";
import { OrderByClasule, WhereClasule } from "@local/types";

async function generateQuery(db: Firestore, collectionName: string, filter: Filter) {
    let conditions: Array<QueryConstraint> = [];
    let orders: Array<QueryConstraint> = [];
    let lastVisible: Array<QueryConstraint> = [];

    if (filter.where) {
        conditions = filter.where.map((params: WhereClasule) => where(...params));
    }

    if (filter.orderBy) {
        orders = filter.orderBy.map((params: OrderByClasule) => orderBy(...params));
    }

    if (filter.startAfter) {
        const docRef = doc(db, collectionName, filter.startAfter);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            lastVisible = [startAfter(docSnap)];
        }
    }

    const q = query(
        collection(db, collectionName),
        ...conditions,
        ...orders,
        ...lastVisible,
        limit(filter.limit ?? 10)
    );

    return q;
}

export default generateQuery;