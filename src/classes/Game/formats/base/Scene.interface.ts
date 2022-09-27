import PhysicsFormat from "./Physics.interface";
import BodyFormat from "./Body.interface";
import ObjectFormat from "./Object.interface";

interface Scene {
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
        id: number;
        uuid: string;
        name: string;
        game?: string;
        stage?: string;
        type: "Scene";
        matrix: number[];
        children: ObjectFormat[];
    };
}

export default Scene;