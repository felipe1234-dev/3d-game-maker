import { Game } from "@local/classes";

interface HemisphereLight extends Game.ObjectFormat {
    type: "HemisphereLight";
    skyColor: number;
    groundColor: number;
    intensity: number;
    castShadow: false;
    receiveShadow: false;
}

export default HemisphereLight;