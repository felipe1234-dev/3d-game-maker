import { Object3D, isObject3D } from "../base";

interface Group extends Object3D {
    object: Object3D["object"] & {
        children: Object3D[];
    }
}

function isGroup(json: any): json is Group {
    return (
        isObject3D(json) &&
        Array.isArray(json.object.children) &&
        json.object.children.every((item: any) => isObject3D(item))
    );
}

export type { Group };
export { isGroup };