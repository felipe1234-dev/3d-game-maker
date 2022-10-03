import { Light, isLight } from "./Light.interface";

interface PointLight extends Light {
    type: "PointLight";
    distance: number;
    decay: number;
    receiveShadow: false;
}

function isPointLight(json: any): json is PointLight {
    const isLightFormat = isLight(json);
    const typeIsCorrect = json.type === "PointLight";
    const distanceIsCorrect = typeof json.distance === "number";
    const decayIsCorrect = typeof json.decay === "number";
    const receiveShadowIsCorrect = !!json.receiveShadow === false;

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