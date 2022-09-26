import Object from "./Object.interface";

interface Mesh extends Object {
    type: "Mesh";
    geometry?: string;
    material?: string;
    body?: string;
}

export default Mesh;