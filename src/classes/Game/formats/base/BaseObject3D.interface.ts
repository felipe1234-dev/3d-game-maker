import { Object3D, isObject3D } from "./Object3D.interface";

interface BaseObject3D extends Object3D {

}

function isBaseObject3D(json: any): json is BaseObject3D {
    return isObject3D(json);
}

export type { BaseObject3D };
export { isBaseObject3D };