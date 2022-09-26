import { Game } from "@local/classes";

interface DirectionalLight extends Game.ObjectFormat {
    type: "DirectionalLight";
    color: number;
    intensity: number;
    receiveShadow: false;
}

export default DirectionalLight;