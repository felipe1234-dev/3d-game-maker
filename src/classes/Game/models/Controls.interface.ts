import { Game } from "@local/classes";

interface Controls {
    id: number;
    uuid: string;
    type: typeof Game.Libs.controls[number];
    name: string;
    camera: Game.Camera;
    mesh: Game.Mesh;
    children: Game.Object3D[];
    connect: () => void;
    disconnect: () => void;
    update: (delta: number) => void;
    toJSON(): Game.Formats.Controls
}

function isControls(obj: any): obj is Controls {
    if (!(obj instanceof Object)) return false;
    if (!Game.isCamera(obj.camera)) return false;
    if (!(obj.mesh instanceof Game.Mesh)) return false;
    if (!Array.isArray(obj.children)) return false;
    if (
        obj.children.some((child: any) => !Game.isObject3D(child))
    ) return false;
    if (typeof obj.connect !== "function") return false;
    if (typeof obj.disconnect !== "function") return false;
    if (typeof obj.update !== "function") return false;
    if (typeof obj.toJSON !== "function") return false;

    return true;
}

export type { Controls };
export { isControls };