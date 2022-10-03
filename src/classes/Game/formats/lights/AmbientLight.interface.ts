import { Light, isLight } from "./Light.interface";

interface AmbientLight extends Light {
    type: "AmbientLight";
    receiveShadow: false;
}

function isAmbientLight(json: any): json is AmbientLight {
    if (!isLight(json)) return false;

    const typeIsCorrect = json.type === "AmbientLight";
    const receiveShadowIsCorrect = !!json.receiveShadow === false;

    return typeIsCorrect && receiveShadowIsCorrect;
}

export type { AmbientLight };
export { isAmbientLight };