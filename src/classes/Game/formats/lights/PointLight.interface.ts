import { Light, isLight } from "./Light.interface";

interface PointLight extends Light {
    object: Light["object"] & {
        type: "PointLight";
        distance: number;
        decay: number;
        receiveShadow: false;
    }
}

function isPointLight(json: any): json is PointLight {
    const isLightFormat = isLight(json);
    const typeIsCorrect = json.object.type === "PointLight";
    const distanceIsCorrect = typeof json.object.distance === "number";
    const decayIsCorrect = typeof json.object.decay === "number";
    const receiveShadowIsCorrect = !!json.object.receiveShadow === false;

    return (
        isLightFormat &&
        typeIsCorrect &&
        distanceIsCorrect &&
        decayIsCorrect &&
        receiveShadowIsCorrect
    );
}

export type { PointLight };
export { isPointLight };