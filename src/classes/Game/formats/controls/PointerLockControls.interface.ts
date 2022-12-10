import { isControls, Controls } from "./Controls.interface";

interface PointerLockControls extends Controls {
    mesh: string;
    sensitivity: number;
}

function isPointerLockControls(json: any): json is PointerLockControls {
    if (!(json instanceof Object)) return false;

    if (typeof json.mesh !== "string") return false;
    if (typeof json.sensitivity !== "number") return false;
    if (!isControls(json)) return false;

    return true;
}

export type { PointerLockControls };
export { isPointerLockControls };