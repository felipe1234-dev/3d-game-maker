import ObjectFormat from "./ObjectFormat.interface";

interface AmbientLightFormat extends ObjectFormat {
    type: "AmbientLight";
    color: number;
    intensity: number;
    receiveShadow: false;
}

export default AmbientLightFormat;