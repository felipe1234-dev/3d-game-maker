import { Physics, isPhysics } from "./Physics.interface";
import { Object3D, isObject3D } from "./Object3D.interface";
import { Controls, isControls } from "../controls";

interface Scene extends Object3D {
    object: Object3D["object"] & {
        type: "Scene";
        name: string;
        children: Object3D["object"][];
        game?: string;
        stage?: string;
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
        controls?: Controls[]
    };
}

function isScene(json: any): json is Scene {
    if (!(json instanceof Object)) return false;

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
        if (!["string", "number"].includes(typeof object.background))
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
        } else {
            return false;
        }
    }

    if ("controls" in object) {
        if (!Array.isArray(object.controls)) return false;
        if (
            object.controls.some((item: any) => !isControls(item))
        ) return false;
    }

    if (!Array.isArray(object.children)) return false;
    for (const item of object.children) {
        if (!isObject3D({ object: item })) return false;
    }

    if (!isObject3D(json)) return false;

    return true;
}

export type { Scene };
export { isScene };