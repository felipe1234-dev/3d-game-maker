import * as THREE from "three";

interface Helper extends THREE.Object3D {
    update: () => void;
}

function isHelper(obj: any): obj is Helper {
    if (!(obj instanceof Object)) return false;
    if (typeof obj.update !== "function") return false;
    if (!(obj instanceof THREE.Object3D)) return false;

    return true;
}

export type { Helper };
export { isHelper };