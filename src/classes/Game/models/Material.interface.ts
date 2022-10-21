import { Game } from "@local/classes";
import * as THREE from "three";

interface Material extends THREE.Material {
    type: typeof Game.Libs.materials[number];
    toJSON(): Game.Formats.Material;
}

function isMaterial(obj: any): obj is Material {
    if (!(obj instanceof Object)) return false;

    if (!Game.Libs.materials.includes(obj.type)) return false;
    if (typeof obj.toJSON !== "function") return false;
    if (!(obj instanceof THREE.Material)) return false;

    return true;
}

export type { Material };
export { isMaterial };