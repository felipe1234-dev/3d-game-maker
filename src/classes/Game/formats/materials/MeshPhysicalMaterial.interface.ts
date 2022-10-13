import { Material, isMaterial } from "./Material.interface";

interface MeshPhysicalMaterial extends Material {
    type: "MeshPhysicalMaterial";

    clearcoatRoughnessMap?: string; // Map uuid
    clearcoatMap?: string; // Map uuid
    clearcoatNormalMap?: string; // Map uuid
    sheenColorMap?: string; // Map uuid
    sheenRoughnessMap?: string; // Map uuid
    transmissionMap?: string; // Map uuid
    thicknessMap?: string; // Map uuid
    specularIntensityMap?: string; // Map uuid
    specularColorMap?: string; // Map uuid
    iridescenceMap?: string; // Map uuid
    iridescenceThicknessMap?: string; // Map uuid

    clearcoat: number;
    clearcoatRoughness: number;
    reflectivity: number;
    sheen: number;
    sheenRoughness: number;
    transmission: number;
    thickness: number;
    attenuationDistance: number;
    specularIntensity: number;
    iridescenceIOR: number;

    sheenColor: number | string; // Color representation
    attenuationColor: number | string; // Color representation
    specularColor: number | string; // Color representation    

    iridescenceThicknessRange: [start: number, end: number];
    clearcoatNormalScale?: [x: number, y: number];
}

function isMeshPhysicalMaterial(json: any): json is MeshPhysicalMaterial {
    if (!(json instanceof Object)) return false;

    if (json.type !== "MeshPhysicalMaterial") return false;

    const optionalMaps = [
        "clearcoatRoughnessMap",
        "clearcoatMap",
        "clearcoatNormalMap",
        "sheenColorMap",
        "sheenRoughnessMap",
        "transmissionMap",
        "thicknessMap",
        "specularIntensityMap",
        "specularColorMap",
        "iridescenceMap",
        "iridescenceThicknessMap",
    ];
    for (const prop of optionalMaps) {
        if (json[prop] !== undefined) {
            if (typeof json[prop] !== "string") return false;
        }
    }

    const requiredNumbers = [
        "clearcoat",
        "clearcoatRoughness",
        "reflectivity",
        "sheen",
        "sheenRoughness",
        "transmission",
        "thickness",
        "attenuationDistance",
        "specularIntensity",
        "iridescenceIOR",
    ];
    for (const prop of requiredNumbers) {
        if (typeof json[prop] !== "number") return false;
    }

    const requiredColors = [
        "sheenColor",
        "attenuationColor",
        "specularColor",
    ];
    for (const prop of requiredColors) {
        if (!["string", "number"].includes(typeof json[prop]))
            return false;
    }

    if (!Array.isArray(json.iridescenceThicknessRange))
        return false;
    if (json.iridescenceThicknessRange.length !== 2)
        return false;
    const [start, end] = json.iridescenceThicknessRange;
    if (typeof start !== "number") return false;
    if (typeof end !== "number") return false;

    if (json.clearcoatNormalScale !== undefined) {
        if (!Array.isArray(json.clearcoatNormalScale))
            return false;
        if (json.clearcoatNormalScale.length !== 2)
            return false;
        const [x, y] = json.clearcoatNormalScale;
        if (typeof x !== "number") return false;
        if (typeof y !== "number") return false;
    }

    if (!isMaterial(json)) return false;

    return true;
}

export type { MeshPhysicalMaterial };
export { isMeshPhysicalMaterial };