import { Game } from "@local/classes";

interface AmbientLight extends Game.ObjectFormat {
    type: "AmbientLight";
    color: number;
    intensity: number;
    receiveShadow: false;
}

export default AmbientLight;