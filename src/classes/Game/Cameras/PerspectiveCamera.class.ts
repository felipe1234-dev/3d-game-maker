import * as THREE from "three";
import { Game } from "../../";
import GameCamera from "./GameCamera.interface";

class PerspectiveCamera extends THREE.PerspectiveCamera implements GameCamera {
    public game?: Game.Core;
    
    constructor(
        fov?: number, 
        aspect?: number,
        near?: number,
        far?: number
    ) {
        super(fov, aspect, near, far);
    }
}

export default PerspectiveCamera;