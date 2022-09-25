import ObjectFormat from "./ObjectFormat.interface";

interface SpotLightFormat extends ObjectFormat {
    type: "SpotLight";
    color: number;
    intensity: number;
    distance: number;
    angle: number;
    penumbra: number;
    decay: number;
    receiveShadow: false;
}

export default SpotLightFormat;