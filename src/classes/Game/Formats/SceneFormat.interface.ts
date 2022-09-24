import PhysicsFormat from "./PhysicsFormat.interface";
import BodyFormat from "./BodyFormat.interface";

interface SceneFormat {
    metadata: {
        version: number;
        type: "Object";
        generator: "ObjectExporter";
    };
    geometries: object[];
    materials: object[];
    bodies: BodyFormat[];
    object: {
        uuid: string;
        game?: string;
        stage?: string;
        type: "Scene";
        matrix: number[];
        children: object[];
        physics: PhysicsFormat;
    };
}

export default SceneFormat;