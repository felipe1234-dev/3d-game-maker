import { Game } from "@local/classes";
import { Object3D, isObject3D } from "./Object3D.interface";

interface Controls extends Object3D {
    id: number;
    uuid: string;
    type: typeof Game.Libs.controls[number];
    name: string;
    camera: Game.Camera;
    children: Game.Object3D[];
    connect: () => void;
    disconnect: () => void;
    update: (delta: number) => void;
    toJSON: (meta?: Game.Formats.Meta) => Game.Formats.Controls
}

function isControls(obj: any): obj is Controls {
    if (!(obj instanceof Object)) return false;
    if (!Game.isCamera(obj.camera)) return false;
    if (typeof obj.connect !== "function") return false;
    if (typeof obj.disconnect !== "function") return false;
    if (typeof obj.update !== "function") return false;
    if (typeof obj.toJSON !== "function") return false;
    if (!isObject3D(obj)) return false;

    return true;
}

export type { Controls };
export { isControls };