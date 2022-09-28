import * as THREE from "three";
import { Game } from "@local/classes";

interface GameObject extends THREE.Object3D {
    helper?: Game.ObjectHelper;
    children: GameObject[] | THREE.Object3D[];
}

export default GameObject;
