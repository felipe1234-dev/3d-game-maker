import { Light, isLight } from "./Light.interface";

interface HemisphereLight extends Light {
    object: Light["object"] & {
        type: "HemisphereLight";
        groundColor: string | number; // Color representation
        castShadow: false;
        receiveShadow: false;
    }
}

function isHemisphereLight(json: any): json is HemisphereLight {
    const isLightFormat = isLight(json);
    const typeIsCorrect = json.object.type === "HemisphereLight";
    const groundColorIsCorrect = ["string", "number"].includes(typeof json.object.groundColor);
    const castShadowIsCorrect = !!json.object.castShadow === false;
    const receiveShadow = !!json.object.receiveShadow === false;

    return (
        isLightFormat &&
        typeIsCorrect &&
        groundColorIsCorrect &&
        castShadowIsCorrect &&
        receiveShadow
    );
}

export type { HemisphereLight };
export { isHemisphereLight };