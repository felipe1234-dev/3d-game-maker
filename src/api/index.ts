// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Config
import config from "./firebase-config";

const app = initializeApp(config);
const db = getFirestore(app);
const storage =getStorage(app);

export { app, db, storage };