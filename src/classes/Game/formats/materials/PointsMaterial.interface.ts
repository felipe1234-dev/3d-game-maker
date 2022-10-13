import { Material, isMaterial } from "./Material.interface";

interface PointsMaterial extends Material {
    type: "PointsMaterial";

    color: string | number; // Color representation 

    map?: string; // Map uuid
    alphaMap?: string; // Map uuid

    size: number;
    sizeAttenuation: boolean;
    fog: boolean;
}

function isPointsMaterial(json: any): json is PointsMaterial {
    if (!(json instanceof Object)) return false;
    if (json.type !== "PointsMaterial") return false;

    if (!["string", "number"].includes(json.color)) return false;

    if (
        json.map !== undefined &&
        typeof json.map !== "string"
    ) return false;

    if (
        json.alphaMap !== undefined &&
        typeof json.alphaMap !== "string"
    ) return false;

    if (typeof json.size !== "number") return false;
    if (typeof json.sizeAttenuation !== "boolean") return false;
    if (
        json.fog !== undefined &&
        typeof json.fog !== "boolean"
    ) return false;

    if (!isMaterial(json)) return false;

    return true;
}

export type { PointsMaterial };
export { isPointsMaterial };