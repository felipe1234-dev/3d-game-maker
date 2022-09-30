import * as THREE from "three";
import { Game } from "@local/classes";

interface GameCamera extends THREE.Camera {
    game?: Game.Core;
}

export default GameCamera;