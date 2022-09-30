import * as THREE from "three";
import { Game } from "@local/classes";

class PerspectiveCamera extends THREE.PerspectiveCamera implements Game.Camera {
    public game?: Game.Core;
}

export default PerspectiveCamera;