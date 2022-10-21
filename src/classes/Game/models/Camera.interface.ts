import { Game } from "@local/classes";
import { Object3D, isObject3D } from "./Object3D.interface";

interface Camera extends Object3D {
    type: typeof Game.Libs.cameras[number];
    game?: Game.Core;
}

function isCamera(obj: any): obj is Camera {
    if (!(obj instanceof Object)) return false;

    if (!Game.Libs.cameras.includes(obj.type)) return false;
    if (
        obj.game !== undefined &&
        !(obj.game instanceof Game.Core)
    ) return false;

    if (!isObject3D(obj)) return false;

    return true;
}

export type { Camera };
export { isCamera };