import PhysicsFormat from "./PhysicsFormat.interface";
import BodyFormat from "./BodyFormat.interface";
import ObjectFormat from "./ObjectFormat.interface";

interface SceneFormat {
    metadata: {
        version: number;
        type: "Object";
        generator: "ObjectExporter";
    };
    geometries: object[];
    materials: object[];
    bodies: BodyFormat[];
    physics: PhysicsFormat;
    object: {
        uuid: string;
        name: string;
        game?: string;
        stage?: string;
        type: "Scene";
        matrix: number[];
        children: ObjectFormat[];
    };
}

export default SceneFormat;