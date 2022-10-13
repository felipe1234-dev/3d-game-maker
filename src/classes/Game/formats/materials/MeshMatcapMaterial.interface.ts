import { isMaterial, Material } from "./Material.interface";
import * as THREE from "three";

interface MeshMatcapMaterial extends Material {
    type: "MeshMatcapMaterial";

    color: string | number;

    matcap?: string; // Map uuid
    map?: string; // Map uuid
    bumpMap?: string; // Map uuid
    normalMap?: string; // Map uuid
    displacementMap?: string; // Map uuid
    alphaMap?: string; // Map uuid

    bumpScale?: number;
    displacementScale?: number;
    displacementBias?: number;

    flatShading?: boolean;
    fog?: boolean;

    normalMapType?: THREE.NormalMapTypes;
    normalScale?: [x: number, y: number];
}

function isMeshMatcapMaterial(json: any): json is MeshMatcapMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "MeshMatcapMaterial") return false;

    if (!["string", "number"].includes(typeof json.color)) return false;

    const optionalMaps = [
        "matcap",
        "map",
        "bumpMap",
        "normalMap",
        "displacementMap",
        "alphaMap",
    ];
    for (const prop of optionalMaps) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "string") return false;
        }
    }

    const optionalNumbers = [
        "bumpScale",
        "isplacementScale",
        "displacementBias"
    ];
    for (const prop of optionalNumbers) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "number") return false;
        }
    }

    const optionalBooleans = ["flatShading", "fog"];
    for (const prop of optionalBooleans) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "boolean") return false;
        }
    }

    if (
        json.normalMapType !== undefined &&
        ![
            THREE.TangentSpaceNormalMap,
            THREE.ObjectSpaceNormalMap
        ].includes(json.normalMapType)
    ) return false;

    if (json.normalScale !== undefined) {
        if (!Array.isArray(json.normalScale)) return false;
        if (json.normalScale.length !== 2) return false;
        if (json.normalScale.some((item: any) => typeof item !== "number"))
            return false;
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshMatcapMaterial };
export { isMeshMatcapMaterial };