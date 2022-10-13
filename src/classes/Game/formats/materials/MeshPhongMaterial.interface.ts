import { Material, isMaterial } from "./Material.interface";
import * as THREE from "three";

interface MeshPhongMaterial extends Material {
    type: "MeshNormalMaterial";

    color: number | string; // Color representation 
    specular: number | string; // Color representation 
    emissive: number | string; // Color representation 

    map?: string; // Map uuid
    lightMap?: string; // Map uuid
    aoMap?: string; // Map uuid
    emissiveMap?: string; // Map uuid
    bumpMap?: string; // Map uuid
    displacementMap?: string; // Map uuid
    normalMap?: string; // Map uuid
    specularMap?: string; // Map uuid
    alphaMap?: string; // Map uuid
    envMap?: string; // Map uuid

    shininess: number;
    lightMapIntensity?: number;
    aoMapIntensity?: number;
    emissiveIntensity?: number;
    bumpScale?: number;
    displacementScale?: number;
    displacementBias?: number;
    reflectivity: number;
    refractionRatio: number;
    wireframeLinewidth?: number;

    wireframe?: boolean;
    flatShading?: boolean;
    fog?: boolean;

    normalScale?: [x: number, y: number];
    normalMapType?: THREE.NormalMapTypes;
    combine?: THREE.Combine;

    wireframeLinecap?: "butt" | "round" | "square";
    wireframeLinejoin?: "round" | "bevel" | "miter";
}

function isMeshPhongMaterial(json: any): json is MeshPhongMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "MeshNormalMaterial") return false;

    const requiredColors = [
        "color",
        "specular",
        "emissive",
    ];
    for (const prop of requiredColors) {
        if (!["string", "number"].includes(typeof json[prop]))
            return false;
    }

    const optionalMaps = [
        "map",
        "lightMap",
        "aoMap",
        "emissiveMap",
        "bumpMap",
        "displacementMap",
        "normalMap",
        "specularMap",
        "alphaMap",
        "envMap",
    ];
    for (const prop of optionalMaps) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "string"
        ) return false;
    }

    const requiredNumbers = [
        "shininess",
        "reflectivity",
        "refractionRatio",
    ];
    for (const prop of requiredNumbers) {
        if (typeof json[prop] !== "number")
            return false;
    }

    const optionalNumbers = [
        "lightMapIntensity",
        "aoMapIntensity",
        "emissiveIntensity",
        "bumpScale",
        "displacementScale",
        "displacementBias",
        "wireframeLinewidth",
    ];
    for (const prop of optionalNumbers) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "number"
        ) return false;
    }

    const optionalBooleans = [
        "wireframe",
        "flatShading",
        "metal",
        "fog",
    ];
    for (const prop of optionalBooleans) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "boolean"
        ) return false;
    }

    if (json.normalScale !== undefined) {
        if (!Array.isArray(json.normalScale))
            return false;
        if (json.normalScale.length !== 2)
            return false;
        if (json.normalScale.some((item: any) => typeof item !== "number"))
            return false;
    }

    if (
        json.normalMapType !== undefined &&
        ![
            THREE.TangentSpaceNormalMap,
            THREE.ObjectSpaceNormalMap,
        ].includes(json.normalMapType)
    ) return false;
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
        ![
            "butt",
            "round",
            "square"
        ].includes(json.wireframeLinecap)
    ) return false;
    if (
        json.wireframeLinejoin !== undefined &&
        ![
            "round",
            "bevel",
            "miter"
        ].includes(json.wireframeLinejoin)
    ) return false;

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshPhongMaterial };
export { isMeshPhongMaterial };