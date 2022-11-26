import { Game } from "@local/classes";

interface Controls {
    id: number;
    uuid: string;
    type: typeof Game.Libs.controls[number];
    name: string;
    camera: string;
}

function isControls(json: any): json is Controls {
    if (!(json instanceof Object)) return false;

    if (typeof json.uuid !== "string") return false;
    if (!Game.Libs.controls.includes(json.type)) return false;
    if (typeof json.name !== "string") return false;
    if (typeof json.camera !== "string") return false;

    return true;
}

export type { Controls };
export { isControls };