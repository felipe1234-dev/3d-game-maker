import * as THREE from "three";
import { Game } from "@local/classes";

class PerspectiveCamera extends THREE.PerspectiveCamera implements Game.Camera {
    public game?: Game.Core;

    constructor(fov?: number, aspect?: number, near?: number, far?: number) {
        super(fov, aspect, near, far);
    }
}

export default PerspectiveCamera;