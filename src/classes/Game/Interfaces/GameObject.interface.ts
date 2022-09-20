import * as THREE from "three";
import ObjectHelper from "./ObjectHelper.interface";

interface GameObject extends THREE.Object3D {
    helper?: ObjectHelper;
    children: GameObject[] | THREE.Object3D[];
}

export default GameObject;