import * as THREE from "three";
import { Game } from "@local/classes";

interface GameObject3D extends THREE.Object3D {
    helper?: Game.ObjectHelper;
    children: GameObject3D[] | THREE.Object3D[];
}

export default GameObject3D;