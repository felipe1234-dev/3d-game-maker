import {
    PhysicsFormat,
    BodyFormat,
    ObjectFormat,
    TextureFormat,
    SourceFormat,
    GeometryFormat,
    MaterialFormat,
} from ".";

interface Scene {
    metadata: {
        version: number;
        type: "Object";
        generator: "ObjectExporter";
    };
    geometries?: GeometryFormat[];
    materials?: MaterialFormat[];
    images?: SourceFormat[];
    bodies?: BodyFormat[];
    textures?: TextureFormat[];
    shapes?: any[];
    skeletons?: any[];
    nodes?: any[];
    animations?: any[];
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