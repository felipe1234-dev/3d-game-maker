import { Light, isLight } from "./Light.interface";

interface DirectionalLight extends Light {
    object: Light["object"] & {
        type: "DirectionalLight";
        receiveShadow: false;
    }
}

function isDirectionalLight(json: any): json is DirectionalLight {
    if (!isLight(json)) return false;

    const typeIsCorrect = json.object.type === "DirectionalLight";
    const receiveShadowIsCorrect = !!json.object.receiveShadow === false;

    return typeIsCorrect && receiveShadowIsCorrect;
}

export type { DirectionalLight };
export { isDirectionalLight };