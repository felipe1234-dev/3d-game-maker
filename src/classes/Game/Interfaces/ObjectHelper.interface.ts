import * as THREE from "three";

interface ObjectHelper extends THREE.Object3D {
    update: () => void;
}

export default ObjectHelper;