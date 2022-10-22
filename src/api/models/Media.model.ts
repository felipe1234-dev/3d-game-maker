import BaseModel from "./BaseModel.model";
import { validateURL } from "@local/functions";

class Media extends BaseModel {
    public title: string;
    public description: string;

    public folders: string;
    public mimeType: string;
    public extension: string;

    public url: string;
    public createdBy: string;

    constructor() {
        super();

        this.title = "";
        this.description = "";
        this.folders = "";

        this.mimeType = "";
        this.extension = "";

        this.url = "";
        this.createdBy = "";
    }

    public static testType(obj: any): obj is Media {
        return obj instanceof Media || (
            obj.title && typeof obj.title === "string" &&
            obj.description && typeof obj.description === "string" &&
            obj.folders && typeof obj.folders === "string" &&
            obj.mimeType && typeof obj.mimeType === "string" &&
            obj.extension && typeof obj.extension === "string" &&
            obj.url && typeof obj.url === "string" && validateURL(obj.url) &&
            obj.createdBy && typeof obj.createdBy === "string" &&
            BaseModel.testType(obj)
        );
    }
}

export default Media;