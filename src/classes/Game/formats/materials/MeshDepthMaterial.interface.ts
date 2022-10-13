import { Material, isMaterial } from "./Material.interface";

interface MeshDepthMaterial extends Material {
    type: "MeshDepthMaterial";

    map?: string; // Map uuid
    alphaMap?: string; // Map uuid
    displacementMap?: string; // Map uuid

    displacementScale?: number;
    displacementBias?: number;
    wireframeLinewidth?: number;

    wireframe?: boolean;
    fog?: boolean;
}

function isMeshDepthMaterial(json: any): json is MeshDepthMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "MeshDepthMaterial") return false;

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
        "displacementBias",
        "wireframeLinewidth"
    ];
    for (const prop of optionalNumbers) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "number") return false;
        }
    }

    const optionalBooleans = ["fog", "wireframe"];
    for (const prop of optionalBooleans) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "boolean") return false;
        }
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshDepthMaterial };
export { isMeshDepthMaterial };