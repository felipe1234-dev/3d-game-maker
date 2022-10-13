import { Material, isMaterial } from "./Material.interface";

interface LineDashedMaterial extends Material {
    type: "LineDashedMaterial";
    scale: number;
    dashSize: number;
    gapSize: number;
}

function isLineDashedMaterial(json: any): json is LineDashedMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "LineDashedMaterial") return false;

    const requiredNumbers = [
        "scale",
        "dashSize",
        "gapSize"
    ];

    for (const prop of requiredNumbers) {
        if (typeof json[prop] !== "number") return false;
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { LineDashedMaterial };
export { isLineDashedMaterial };