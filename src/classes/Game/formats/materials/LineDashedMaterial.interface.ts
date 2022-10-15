import { LineBasicMaterial, isLineBasicMaterial } from "./LineBasicMaterial.interface";

interface LineDashedMaterial extends Omit<LineBasicMaterial, "type"> {
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

    if (!isLineBasicMaterial({
        ...json,
        type: "LineBasicMaterial",
    })) return false;

    return true;
}

export type { LineDashedMaterial };
export { isLineDashedMaterial };