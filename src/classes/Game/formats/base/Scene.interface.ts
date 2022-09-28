import PhysicsFormat from "./Physics.interface";
import BodyFormat from "./Body.interface";
import ObjectFormat from "./Object.interface";
import TextureFormat from "./Texture.interface";
import SourceFormat from "./Source.interface";

interface Scene {
    metadata: {
        version: number;
        type: "Object";
        generator: "ObjectExporter";
    };
    geometries?: object[];
    materials?: object[];
    images?: SourceFormat[];
    bodies?: BodyFormat[];
    textures?: TextureFormat[];
    object: {
        id: number;
        uuid: string;
        name: string;
        game?: string;
        stage?: string;
        type: "Scene";
        matrix: number[];
        physics: PhysicsFormat;
        background?: number | string; // Color representation as a number or texture uuid as a string
        environment?: string;
        fog?:
            | {
                  type: "Fog";
                  color: number;
                  near: number;
                  far: number;
              }
            | {
                  type: "FogExp2";
                  color: number;
                  density: number;
              };
        children: ObjectFormat[];
    };
}

export default Scene;