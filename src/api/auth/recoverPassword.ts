import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toAlert } from "../functions";
import { getLang } from "@local/i18n";

export default function recoverPassword(email: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const { origin, pathname } = window.location;

            await sendPasswordResetEmail(getAuth(), email, {
                url: `${origin + pathname}#/${getLang()}/auth/`,
                handleCodeInApp: true
            });

            resolve();
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
}