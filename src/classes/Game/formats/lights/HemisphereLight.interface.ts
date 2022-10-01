import { Game } from "@local/classes";

interface HemisphereLight extends Game.Formats.Object {
    type: "HemisphereLight";
    skyColor: number;
    groundColor: number;
    intensity: number;
    castShadow: false;
    receiveShadow: false;
}

export default HemisphereLight;