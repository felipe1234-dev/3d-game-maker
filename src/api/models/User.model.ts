import BaseModel from "./BaseModel.model";

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
}

export default User;