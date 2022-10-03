import { Light, isLight } from "./Light.interface";

interface DirectionalLight extends Light {
    type: "DirectionalLight";
    receiveShadow: false;
}

function isDirectionalLight(json: any): json is DirectionalLight {
    if (!isLight(json)) return false;

    const typeIsCorrect = json.type === "DirectionalLight";
    const receiveShadowIsCorrect = !!json.receiveShadow === false;

    return typeIsCorrect && receiveShadowIsCorrect;
}

export type { DirectionalLight };
export { isDirectionalLight };