import { isMaterial, Material } from "./Material.interface";
import * as THREE from "three";

interface MeshBasicMaterial extends Material {
    type: "MeshBasicMaterial";

    color: number | string; // Color representation

    map?: string; // Map uuid
    envMap?: string; // Map uuid
    lightMap?: string; // Map uuid
    aoMap?: string; // Map uuid
    specularMap?: string; // Map uuid
    alphaMap?: string; // Map uuid

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

function isMeshBasicMaterial(json: any): json is MeshBasicMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "MeshBasicMaterial") return false;

    if (!["string", "number"].includes(typeof json.color)) return false;

    const optionalMaps = [
        "map",
        "lightMap",
        "aoMap",
        "specularMap",
        "alphaMap",
        "envMap"
    ];
    for (const prop of optionalMaps) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "string") return false;
        }
    }

    const optionalNumbers = [
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

    const optionalEnums = [
        {
            prop: "combine",
            values: [
                THREE.MultiplyOperation,
                THREE.MixOperation,
                THREE.AddOperation,
            ]
        },
        {
            prop: "wireframeLinecap",
            values: ["butt", "round", "square"],
        },
        {
            prop: "wireframeLinejoin",
            values: ["round", "bevel", "miter"]
        }
    ];
    for (const item of optionalEnums) {
        const { prop, values } = item;

        if (json[prop] !== undefined) {
            // @ts-ignore
            if (!values.includes(json[prop])) return false;
        }
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshBasicMaterial };
export { isMeshBasicMaterial };