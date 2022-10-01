import { Game } from "@local/classes";

interface SpotLight extends Game.Formats.Object {
    type: "SpotLight";
    color: number;
    intensity: number;
    distance: number;
    angle: number;
    penumbra: number;
    decay: number;
    receiveShadow: false;
}

export default SpotLight;