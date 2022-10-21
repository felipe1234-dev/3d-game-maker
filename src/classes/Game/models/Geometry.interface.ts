import { Game } from "@local/classes";
import * as THREE from "three";

interface Geometry extends THREE.BufferGeometry {
    type: typeof Game.Libs.geometries[number];
    parameters: any;
    toJSON: () => Game.Formats.Geometry;
}

function isGeometry(obj: any): obj is Geometry {
    if (!(obj instanceof Object)) return false;

    if (!Game.Libs.geometries.includes(obj.type)) return false;
    if (!(obj.parameters instanceof Object)) return false;
    if (typeof obj.toJSON !== "function") return false;
    if (!(obj instanceof THREE.BufferGeometry)) return false;

    return true;
}

export type { Geometry };
export { isGeometry };