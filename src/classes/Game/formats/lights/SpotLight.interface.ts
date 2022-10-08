import { Light, isLight } from "./Light.interface";

interface SpotLight extends Light {
    object: Light["object"] & {
        type: "SpotLight";
        distance: number;
        angle: number;
        penumbra: number;
        decay: number;
        receiveShadow: false;
    }
}

function isSpotLight(json: any): json is SpotLight {
    const isLightFormat = isLight(json);
    const typeIsCorrect = json.object.type === "SpotLight";
    const distanceIsCorrect = typeof json.object.distance === "number";
    const angleIsCorrect = typeof json.object.angle === "number";
    const penumbraIsCorrect = typeof json.object.penumbra === "number";
    const decayIsCorrect = typeof json.object.decay === "number";
    const receiveShadowIsCorrect = !!json.object.receiveShadow === false;

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