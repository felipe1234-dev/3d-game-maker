import { Material, isMaterial } from "./Material.interface";

interface MeshDistanceMaterial extends Material {
    type: "MeshDistanceMaterial";

    map?: string; // Map uuid
    alphaMap?: string; // Map uuid
    displacementMap?: string; // Map uuid

    displacementScale?: number;
    displacementBias?: number;
}

function isMeshDistanceMaterial(json: any): json is MeshDistanceMaterial {
    if (!(json instanceof Object)) return false;
    if (json.type !== "MeshDistanceMaterial") return false;

    const optionalMaps = [
        "map",
        "alphaMap",
        "displacementMap"
    ];
    for (const prop of optionalMaps) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "string") return false;
        }
    }

    const optionalNumbers = [
        "displacementScale",
        "displacementBias"
    ];
    for (const prop of optionalNumbers) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "number") return false;
        }
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshDistanceMaterial };
export { isMeshDistanceMaterial };