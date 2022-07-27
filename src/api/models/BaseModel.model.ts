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
}

export default BaseModel;