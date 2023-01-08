import { Game } from "@local/classes";
import { Object3D, isObject3D } from "../base";

interface Controls extends Object3D {
    object: {
        id: number;
        uuid: string;
        type: typeof Game.Libs.controls[number];
        name: string;
        camera: string;
    } & Object3D["object"]
}

function isControls(json: any): json is Controls {
    if (!(json instanceof Object)) return false;
    if (!(json.object instanceof Object)) return false;

    if (typeof json.object.uuid !== "string") return false;
    if (!Game.Libs.controls.includes(json.object.type)) return false;
    if (typeof json.object.name !== "string") return false;
    if (typeof json.object.camera !== "string") return false;
    if (!isObject3D(json)) return false;
    
    return true;
}

export type { Controls };
export { isControls };