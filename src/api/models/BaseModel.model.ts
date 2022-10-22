import { Timestamp } from "firebase/firestore";
import { generatePushID } from "@local/api/functions";

class BaseModel {
    public uid: string;
    public tags: Array<string>;
    public createdAt: Timestamp;

    constructor() {
        this.uid = generatePushID();
        this.tags = [];
        this.createdAt = Timestamp.fromDate(new Date());
    }

    public static testType(obj: any): obj is BaseModel {
        return obj instanceof BaseModel || (
            obj && obj instanceof Object &&
            obj.uid && typeof obj.uid === "string" &&
            obj.tags && obj.tags instanceof Array &&
            obj.tags.every((item: unknown) => typeof item === "string") &&
            obj.createdAt instanceof Timestamp
        );
    }
}

export default BaseModel;