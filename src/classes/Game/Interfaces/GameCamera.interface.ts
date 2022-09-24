import * as THREE from "three";
import { Game } from "../..";

interface GameCamera extends THREE.Camera {
    game?: Game.Core;
    toJSON(meta?: any): any;
}

export default GameCamera;