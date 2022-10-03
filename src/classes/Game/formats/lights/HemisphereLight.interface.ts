import { Light, isLight } from "./Light.interface";

interface HemisphereLight extends Light {
    type: "HemisphereLight";
    skyColor: number;
    groundColor: number;
    castShadow: false;
    receiveShadow: false;
}

function isHemisphereLight(json: any): json is HemisphereLight {
    const isLightFormat = isLight(json);
    const typeIsCorrect = json.type === "HemisphereLight";
    const skyColorIsCorrect = typeof json.skyColor === "number";
    const groundColorIsCorrect = typeof json.groundColor === "number";
    const castShadowIsCorrect = !!json.castShadow === false;
    const receiveShadow = !!json.receiveShadow === false;

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