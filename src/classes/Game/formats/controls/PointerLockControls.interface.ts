import { isControls, Controls } from "./Controls.interface";

interface PointerLockControls extends Controls {
    object: {
        mesh: string;
        sensitivity: number;
    } & Controls["object"]
}

function isPointerLockControls(json: any): json is PointerLockControls {
    if (!(json instanceof Object)) return false;
    if (!(json.object instanceof Object)) return false;
    if (typeof json.object.mesh !== "string") return false;
    if (typeof json.object.sensitivity !== "number") return false;
    if (!isControls(json)) return false;

    return true;
}

export type { PointerLockControls };
export { isPointerLockControls };