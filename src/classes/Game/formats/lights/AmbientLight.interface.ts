import { Game } from "@local/classes";

interface AmbientLight extends Game.Formats.Object {
    type: "AmbientLight";
    color: number;
    intensity: number;
    receiveShadow: false;
}

export default AmbientLight;