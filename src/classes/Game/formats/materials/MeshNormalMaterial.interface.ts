import { isMaterial, Material } from "./Material.interface";
import * as THREE from "three";

interface MeshNormalMaterial extends Material {
    type: "MeshNormalMaterial";

    bumpMap?: string; // Map uuid
    normalMap?: string; // Map uuid
    displacementMap?: string; // Map uuid

    bumpScale?: number;
    displacementScale?: number;
    displacementBias?: number;
    wireframeLinewidth?: number;

    wireframe?: boolean;
    flatShading?: boolean;

    normalMapType?: THREE.NormalMapTypes;
    normalScale?: [x: number, y: number];
}

function isMeshNormalMaterial(json: any): json is MeshNormalMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "MeshNormalMaterial") return false;

    const optionalMaps = [
        "bumbMap",
        "normalMap",
        "displacementMap",
    ];
    for (const prop of optionalMaps) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "string") return false;
        }
    }

    const optionalNumbers = [
        "bumpScale",
        "displacementScale",
        "displacementBias",
        "wireframeLinewidth"
    ];
    for (const prop of optionalNumbers) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "number"
        ) return false;
    }

    const optionalBooleans = [
        "wireframe",
        "flatShading"
    ];
    for (const prop of optionalBooleans) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "boolean"
        ) return false;
    }

    if (
        json.normalMapType !== undefined &&
        ![
            THREE.TangentSpaceNormalMap,
            THREE.ObjectSpaceNormalMap
        ].includes(json.normalMapType)
    ) return false;

    if (json.normalScale !== undefined) {
        if (Array.isArray(json.normalScale)) return false;
        if (json.normalScale.length !== 2) return false;
        if (json.normalScale.some((item: any) => typeof item !== "number")) return false;
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshNormalMaterial };
export { isMeshNormalMaterial };