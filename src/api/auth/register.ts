import { Alert } from "@local/interfaces";
import { FirebaseError } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    sendEmailVerification
} from "firebase/auth";

import * as users from "../collections/users";
import * as auth from "./index";

import { toAlert } from "../functions";
import { User } from "../models";

export default function register(props: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}): Promise<User> {
    return new Promise(async (resolve, reject) => {
        const firebaseAuth = getAuth();
        const {
            firstName,
            lastName,
            email,
            password
        } = props;

        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            
            const { origin, pathname } = window.location;
            await sendEmailVerification(userCredential.user, {
                url: `${origin + pathname}#/auth/?verify=true&email=${email}&password=${password}`,
                handleCodeInApp: true
            });

            let user = new User();

            user.uid = userCredential.user.uid;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;

            try {
                user = await users.create(user);
                await auth.logIn(email, password);

                resolve(user);
            } catch (error) {
                reject(error as Alert);
            }
        } catch (error) {
            reject(toAlert(error as FirebaseError));
        }
    });
};