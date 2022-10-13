import * as THREE from "three";

interface Helper extends THREE.Object3D {
    update: () => void;
}

export default Helper;