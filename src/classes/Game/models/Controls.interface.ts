import { Game } from "@local/classes";

interface Controls {
    id: number;
    uuid: string;
    name: string;
    camera: Game.Camera;
    mesh: Game.Mesh;
    connect: () => void;
    disconnect: () => void;
    update: (delta: number) => void;
    toJSON(): Game.Formats.Controls
}

function isControls(obj: any): obj is Controls {
    if (!(obj instanceof Object)) return false;
    if (!Game.isCamera(obj.camera)) return false;
    if (!(obj.mesh instanceof Game.Mesh)) return false;
    if (typeof obj.connect !== "function") return false;
    if (typeof obj.disconnect !== "function") return false;
    if (typeof obj.update !== "function") return false;
    if (typeof obj.toJSON !== "function") return false;

    return true;
}

export type { Controls };
export { isControls };