import BaseModel from "./BaseModel.model";

class Media extends BaseModel {
    public description: string;
    public folders: Array<string>;
    
    public alt: string;
    public url: string;

    public createdBy: string;

    constructor() {
        super();

        this.description = "";
        this.folders = [];

        this.alt = "";
        this.url = "";

        this.createdBy = "";
    }
}

export default Media;