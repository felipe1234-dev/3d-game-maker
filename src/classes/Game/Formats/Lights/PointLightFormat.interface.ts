import ObjectFormat from "../ObjectFormat.interface";

interface PointLightFormat extends ObjectFormat {
    type: "PointLight";
    color: number;
    intensity: number;
    distance: number;
    decay: number;
    receiveShadow: false;
}

export default PointLightFormat;