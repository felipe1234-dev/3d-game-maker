import { Light, isLight } from "./Light.interface";

interface AmbientLight extends Light {
    object: Light["object"] & {
        type: "AmbientLight";
        receiveShadow: false;
    }
}

function isAmbientLight(json: any): json is AmbientLight {
    if (!isLight(json)) return false;

    const typeIsCorrect = json.object.type === "AmbientLight";
    const receiveShadowIsCorrect = !!json.object.receiveShadow === false;

    return typeIsCorrect && receiveShadowIsCorrect;
}

export type { AmbientLight };
export { isAmbientLight };