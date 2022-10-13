import { Material, isMaterial } from "./Material.interface";

interface LineBasicMaterial extends Material {
    type: "LineBasicMaterial";
    color: number | string; // Color representation as a number or string
    linewidth?: number;
    linecap?: "butt" | "round" | "square";
    linejoin?: "round" | "bevel" | "miter";
}

function isLineBasicMaterial(json: any): json is LineBasicMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "LineBasicMaterial") return false;
    if (!["number", "string"].includes(typeof json.color)) return false;

    if (json.linewidth !== undefined) {
        if (typeof json.linewidth !== "number")
            return false;
    }

    if (json.linecap !== undefined) {
        if (!["butt", "round", "square"].includes(json.linecap))
            return false;
    }

    if (json.linejoin !== undefined) {
        if (!["round", "bevel", "mitter"].includes(json.linejoin))
            return false;
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { LineBasicMaterial };
export { isLineBasicMaterial };