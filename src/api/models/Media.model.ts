import BaseModel from "./BaseModel.model";

class Media extends BaseModel {
    public title: string;
    public description: string;

    public folders: Array<string>;
    public mimeType: string;
    public extension: string;

    public url: string;
    public createdBy: string;

    constructor() {
        super();

        this.title = "";
        this.description = "";
        this.folders = [];

        this.mimeType = "";
        this.extension = "";

        this.url = "";
        this.createdBy = "";
    }
}

export default Media;