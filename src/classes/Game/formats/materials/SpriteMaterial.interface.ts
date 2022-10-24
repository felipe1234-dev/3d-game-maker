import { Material, isMaterial } from "./Material.interface";

interface SpriteMaterial extends Material {
    type: "SpriteMaterial";

    color: string | number; // Color representation

    map?: string; // Map uuid
    alphaMap?: string; // Map uuid

    rotation?: number;

    sizeAttenuation: boolean;
    transparent?: boolean;
    fog?: boolean;
}

function isSpriteMaterial(json: any): json is SpriteMaterial {
    if (!(json instanceof Object)) return false;
    if (json.type !== "SpriteMaterial") return false;

    if (!["string", "number"].includes(typeof json.color)) return false;

    const optionalMaps = ["map", "alphaMap"];
    for (const prop of optionalMaps) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "string") return false;
        }
    }

    if (
        json.rotation !== undefined &&
        typeof json.rotation !== "number"
    ) return false;

    const requiredBooleans = ["transparent", "fog"];
    for (const prop of requiredBooleans) {
        if (
            json[prop] !== undefined &&
            typeof json[prop] !== "boolean"
        ) return false;
    }

    if (typeof json.sizeAttenuation !== "boolean") return false;

    if (!isMaterial(json)) return false;

    return true;
}

export type { SpriteMaterial };
export { isSpriteMaterial };