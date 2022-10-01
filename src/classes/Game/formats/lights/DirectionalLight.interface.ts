import { Game } from "@local/classes";

interface DirectionalLight extends Game.Formats.Object {
    type: "DirectionalLight";
    color: number;
    intensity: number;
    receiveShadow: false;
}

export default DirectionalLight;