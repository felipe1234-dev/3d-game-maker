import ObjectFormat from "../ObjectFormat.interface";

interface MeshFormat extends ObjectFormat {
    type: "Mesh";
    geometry?: string;
    material?: string;
    body?: string;
}

export default MeshFormat;