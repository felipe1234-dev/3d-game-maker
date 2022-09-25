import ObjectFormat from "./ObjectFormat.interface";

interface DirectionalLightFormat extends ObjectFormat {
    type: "DirectionalLight";
    color: number;
    intensity: number;
    receiveShadow: false;
}

export default DirectionalLightFormat;