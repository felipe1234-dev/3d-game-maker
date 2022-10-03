import { Physics, isPhysics } from "./Physics.interface";
import { Body, isBody } from "./Body.interface";
import { Object3D, isObject3D } from "./Object3D.interface";
import TextureFormat from "./Texture.interface";
import { Source, isSource } from "./Source.interface";
import { Geometry, isGeometry } from "../geometries/Geometry.interface";
import MaterialFormat from "../materials/Material.interface";

interface Scene {
    geometries?: Geometry[];
    materials?: MaterialFormat[];
    images?: Source[];
    bodies?: Body[];
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
        physics: Physics;
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
        children: Object3D[];
    };
}

function isScene(json: any): json is Scene {
    if (!(json instanceof Object)) return false;

    if (json.geometries) {
        if (!Array.isArray(json.geometries)) return false;

        for (const item of json.geometries) {
            if (!isGeometry(item)) return false;
        }
    }

    if (json.images) {
        if (!Array.isArray(json.images)) return false;

        for (const item of json.images) {
            if (!isSource(item)) return false;
        }
    }

    if (json.bodies) {
        if (!Array.isArray(json.bodies)) return false;

        for (const item of json.bodies) {
            if (!isBody(item)) return false;
        }
    }

    const object = json.object;

    if (!(object instanceof Object)) return false;

    if (typeof object.id !== "number") return false;
    if (typeof object.uuid !== "string") return false;
    if (typeof object.name !== "string") return false;

    if (object.game) {
        if (typeof object.game !== "string") return false;
    }
    if (object.stage) {
        if (typeof object.stage !== "string") return false;
    }

    if (object.type !== "Scene") return false;
    if (!Array.isArray(object.matrix)) return false;

    for (const item of object.matrix) {
        if (typeof item !== "number") return false;
    }

    if (!isPhysics(object.physics)) return false;

    if ("environment" in object) {
        if (typeof object.environment !== "string") return false;
    }

    if ("background" in object) {
        if (["string", "number"].includes(typeof object.background))
            return false;
    }

    if ("fog" in object) {
        if (!(object.fog instanceof Object)) return false;
        if (typeof object.fog.color !== "number") return false;

        if (object.type === "Fog") {
            if (typeof object.fog.near !== "number") return false;
            if (typeof object.fog.far !== "number") return false;
        } else if (object.type === "FogExp2") {
            if (typeof object.fog.density !== "number") return false;
        }
    }

    if (!Array.isArray(object.children)) return false;
    for (const item of object.children) {
        if (!isObject3D(item)) return false;
    }

    return true;
}

export type { Scene };
export { isScene };