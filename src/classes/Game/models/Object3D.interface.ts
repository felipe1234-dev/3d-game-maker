import { Game } from "@local/classes";
import { isHelper } from "./Helper.interface";
import * as THREE from "three";

interface Object3D extends THREE.Object3D {
    type: typeof Game.Libs.objects3D[number];
    helper?: Game.Helper;
    children: (Object3D | THREE.Object3D)[];
    toJSON: (meta?: Game.Formats.Meta) => Game.Formats.Object3D;
}

function isObject3D(obj: any): obj is Object3D {
    if (!(obj instanceof Object)) return false;

    if (!Game.Libs.objects3D.includes(obj.type)) return false;

    if (
        obj.helper !== undefined &&
        !isHelper(obj.helper)
    ) return false;

    if (
        !Array.isArray(obj.children)
    ) return false;
    if (
        obj.children.some((child: any) => (
            !isObject3D(child) || !(child instanceof THREE.Object3D)
        ))
    ) return false;

    if (typeof obj.toJSON !== "function") return false;

    if (!(obj instanceof THREE.Object3D)) return false;

    return true;
}

export type { Object3D };
export { isObject3D };