import { Game } from "@local/classes";
import { Object3D, isObject3D } from "./Object3D.interface";
import * as THREE from "three";

interface Camera extends Object3D {
    type: typeof Game.Libs.cameras[number];
    matrixWorldInverse: THREE.Matrix4;
    projectionMatrix: THREE.Matrix4;
    projectionMatrixInverse: THREE.Matrix4;
    readonly isCamera: true;
    getWorldDirection(target: THREE.Vector3): THREE.Vector3;
    updateMatrixWorld(force?: boolean): void;
}

function isCamera(obj: any): obj is Camera {
    if (!(obj instanceof Object)) return false;

    if (!Game.Libs.cameras.includes(obj.type)) return false;
    if (
        obj.game !== undefined &&
        !(obj.game instanceof Game.Core)
    ) return false;

    if (!isObject3D(obj)) return false;
    if (!(obj instanceof THREE.Camera)) return false;

    return true;
}

export type { Camera };
export { isCamera };