import { Game } from "@local/classes";

interface PointLight extends Game.Formats.Object {
    type: "PointLight";
    color: number;
    intensity: number;
    distance: number;
    decay: number;
    receiveShadow: false;
}

export default PointLight;