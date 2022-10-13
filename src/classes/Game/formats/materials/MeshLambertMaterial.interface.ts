import { Material, isMaterial } from "./Material.interface";
import * as THREE from "three";

interface MeshLambertMaterial extends Material {
    type: "MeshLambertMaterial";

    color: number | string; // Color representation
    emissive: number | string; // Color representation

    emissiveMap?: string; // Map uuid
    map?: string; // Map uuid
    lightMap?: string; // Map uuid
    aoMap?: string; // Map uuid
    specularMap?: string; // Map uuid
    alphaMap?: string; // Map uuid
    envMap?: string; // Map uuid

    emissiveIntensity?: number;
    lightMapIntensity?: number;
    aoMapIntensity?: number;
    reflectivity: number;
    refractionRatio: number;
    wireframeLinewidth?: number;

    wireframe?: boolean;
    fog?: boolean;

    combine?: THREE.Combine;
    wireframeLinecap?: "butt" | "round" | "square";
    wireframeLinejoin?: "round" | "bevel" | "miter";
}

function isMeshLambertMaterial(json: any): json is MeshLambertMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "MeshLambertMaterial") return false;

    const requiredColors = ["color", "emissive"];
    for (const prop of requiredColors) {
        if (!["string", "number"].includes(typeof json[prop])) return false;
    }

    const optionalMaps = [
        "emissiveMap",
        "map",
        "lightMap",
        "aoMap",
        "specularMap",
        "alphaMap",
        "envMap",
    ];
    for (const map of optionalMaps) {
        if (json[map] !== undefined) {
            if (typeof json[map] !== "string") return false;
        }
    }

    const optionalNumbers = [
        "emissiveIntensity",
        "lightMapIntensity",
        "aoMapIntensity",
        "wireframeLinewidth",
    ];
    for (const prop of optionalNumbers) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "number") return false;
        }
    }

    const requiredNumbers = [
        "reflectivity",
        "refractionRatio",
    ];
    for (const prop of requiredNumbers) {
        if (typeof json[prop] !== "number") return false;
    }

    const optionalBooleans = ["wireframe", "fog"];
    for (const prop of optionalBooleans) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "boolean") return false;
        }
    }

    if (
        json.combine !== undefined &&
        ![
            THREE.MultiplyOperation,
            THREE.MixOperation,
            THREE.AddOperation
        ].includes(json.combine)
    ) return false;

    if (
        json.wireframeLinecap !== undefined &&
        !["butt", "round", "square"].includes(json.wireframeLinecap)
    ) return false;

    if (
        json.wireframeLinejoin !== undefined &&
        !["round", "bevel", "miter"].includes(json.wireframeLinejoin)
    ) return false;

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshLambertMaterial };
export { isMeshLambertMaterial };