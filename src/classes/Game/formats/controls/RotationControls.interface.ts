import { isPointerLockControls, PointerLockControls } from "./PointerLockControls.interface";

interface RotationControls extends PointerLockControls {}

function isRotationControls(json: any): json is RotationControls {
    if (!(json instanceof Object)) return false;
    if (json.type !== "RotationControls") return false;
    if (!isPointerLockControls(json)) return false;

    return true;
}

export type { RotationControls };
export { isRotationControls };