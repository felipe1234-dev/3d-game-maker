import { validateURL } from "@local/functions";
import BaseModel from "./BaseModel.model";

class Game extends BaseModel {
    public name: string;
    public description: string;
    public createdBy: string;
    public url: string;
    public snippet: boolean;

    constructor() {
        super();

        this.name = "";
        this.description = "";
        this.createdBy = "";
        this.url = "";
        this.snippet = false;
    }

    public static testType(obj: any): obj is Game {
        return obj instanceof Game || (
            obj instanceof Object &&
            typeof obj.name === "string" &&
            typeof obj.description === "string" &&
            typeof obj.createdBy === "string" &&
            typeof obj.url === "string" &&
            validateURL(obj.url) &&
            typeof obj.snippet === "boolean" &&
            BaseModel.testType(obj)
        );
    }
}

export default Game;