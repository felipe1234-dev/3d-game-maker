import { Light, isLight } from "./Light.interface";

interface SpotLight extends Light {
    type: "SpotLight";
    distance: number;
    angle: number;
    penumbra: number;
    decay: number;
    receiveShadow: false;
}

function isSpotLight(json: any): json is SpotLight {
    const isLightFormat = isLight(json);
    const typeIsCorrect = json.type === "SpotLight";
    const distanceIsCorrect = typeof json.distance === "number";
    const angleIsCorrect = typeof json.angle === "number";
    const penumbraIsCorrect = typeof json.penumbra === "number";
    const decayIsCorrect = typeof json.decay === "number";
    const receiveShadowIsCorrect = !!json.receiveShadow === false;

    return (
        isLightFormat &&
        typeIsCorrect &&
        distanceIsCorrect &&
        angleIsCorrect &&
        penumbraIsCorrect &&
        decayIsCorrect &&
        receiveShadowIsCorrect
    );
}

export type { SpotLight };
export { isSpotLight };