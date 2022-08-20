import { FirebaseError } from "firebase/app";
import { sendEmailVerification, UserCredential } from "firebase/auth";
import { toAlert } from "../functions";
import { getLang } from "@local/i18n";

export default function sendEmailConfirmation(
    userCredential: UserCredential, 
    email: string, 
    password: string
): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const { origin, pathname } = window.location;

            await sendEmailVerification(userCredential.user, {
                url: `${origin + pathname}#/${getLang()}/auth/?verify=true&email=${email}&password=${password}`,
                handleCodeInApp: true
            });

            resolve();
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
};