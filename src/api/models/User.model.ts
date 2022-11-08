import BaseModel from "./BaseModel.model";
import { validateEmail, validateURL } from "@local/functions";

class User extends BaseModel {
    public photo: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public admin: boolean;
    public emailVerified: boolean;

    constructor() {
        super();

        this.photo = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.admin = false;
        this.emailVerified = false;
    }

    public static testType(obj: any): obj is User {
        return obj instanceof User || (
            obj && obj instanceof Object &&
            typeof obj.photo === "string" &&
            (obj.photo === "" || validateURL(obj.photo)) &&
            typeof obj.firstName === "string" &&
            typeof obj.lastName === "string" &&
            typeof obj.email === "string" &&
            validateEmail(obj.email) &&
            typeof obj.admin === "boolean" &&
            typeof obj.emailVerified === "boolean" &&
            BaseModel.testType(obj)
        );
    }
}

export default User;