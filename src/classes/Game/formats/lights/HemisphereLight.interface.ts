import { Light, isLight } from "./Light.interface";

interface HemisphereLight extends Light {
    object: Light["object"] & {
        type: "HemisphereLight";
        skyColor: number;
        groundColor: number;
        castShadow: false;
        receiveShadow: false;
    }
}

function isHemisphereLight(json: any): json is HemisphereLight {
    const isLightFormat = isLight(json);
    const typeIsCorrect = json.object.type === "HemisphereLight";
    const skyColorIsCorrect = typeof json.object.skyColor === "number";
    const groundColorIsCorrect = typeof json.object.groundColor === "number";
    const castShadowIsCorrect = !!json.object.castShadow === false;
    const receiveShadow = !!json.object.receiveShadow === false;

    return (
        isLightFormat &&
        typeIsCorrect &&
        skyColorIsCorrect &&
        groundColorIsCorrect &&
        castShadowIsCorrect &&
        receiveShadow
    );
}

export type { HemisphereLight };
export { isHemisphereLight };