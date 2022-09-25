import ObjectFormat from "./ObjectFormat.interface";

interface HemisphereLightFormat extends ObjectFormat {
    type: "HemisphereLight";
    skyColor: number;
    groundColor: number;
    intensity: number;
    castShadow: false;
    receiveShadow: false;
}

export default HemisphereLightFormat;