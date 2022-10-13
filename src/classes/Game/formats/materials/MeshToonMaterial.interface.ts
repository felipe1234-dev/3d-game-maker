import { Material, isMaterial } from "./Material.interface";
import * as THREE from "three";

interface MeshToonMaterial extends Material {
    type: "MeshToonMaterial";

    color: string | number; // Color representation
    emissive: string | number; // Color representation

    gradientMap?: string; // Map uuid
    map?: string; // Map uuid
    lightMap?: string; // Map uuid
    aoMap?: string; // Map uuid
    emissiveMap?: string; // Map uuid
    bumpMap?: string; // Map uuid
    normalMap?: string; // Map uuid
    displacementMap?: string; // Map uuid
    alphaMap?: string; // Map uuid

    lightMapIntensity?: number;
    aoMapIntensity?: number;
    emissiveIntensity?: number;
    bumpScale?: number;
    displacementScale?: number;
    displacementBias?: number;
    wireframeLinewidth?: number;

    wireframe?: boolean;
    fog?: boolean;

    normalMapType?: THREE.NormalMapTypes;
    normalScale?: [x: number, y: number];

    wireframeLinecap?: "butt" | "round" | "square";
    wireframeLinejoin?: "round" | "bevel" | "miter";
}

function isMeshToonMaterial(json: any): json is MeshToonMaterial {
    if (!(json instanceof Object)) return false;
    if (json.type !== "MeshToonMaterial") return false;

    const requiredColors = ["color", "emissive"];
    for (const prop of requiredColors) {
        if (!["string", "number"].includes(typeof json[prop])) return false;
    }

    const optionalMaps = [
        "gradientMap",
        "map",
        "lightMap",
        "aoMap",
        "emissiveMap",
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
        "lightMapIntensity",
        "aoMapIntensity",
        "emissiveIntensity",
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

    const optionalBooleans = ["wireframe", "fog"];
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
            THREE.ObjectSpaceNormalMap,
        ].includes(json.normalMapType)
    ) return false;
    if (
        json.wireframeLinecap !== undefined &&
        !["butt", "round", "square"].includes(json.wireframeLinecap)
    ) return false;
    if (
        json.wireframeLinejoin !== undefined &&
        !["round", "bevel", "miter"].includes(json.wireframeLinejoin)
    ) return false;

    if (json.normalScale !== undefined) {
        if (!Array.isArray(json.normalScale))
            return false;
        if (json.normalScale.length !== 2)
            return false;
        if (json.normalScale.some((item: any) => typeof item !== "number"))
            return false;
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshToonMaterial };
export { isMeshToonMaterial };