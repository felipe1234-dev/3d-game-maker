import { isControls, Controls } from "./Controls.interface";

interface PointerLockControls extends Controls {
    mesh: string;
    person: 1 | 2 | 3;
    sensitivity: number;
    movementVelocity: number;
    jumpVelocity: number;
    doubleJump: boolean;
    enableJump: boolean;
    enableMove: boolean;
    keys: {
        jump: string[];
        moveForward: string[];
        moveBackward: string[];
        moveLeft: string[];
        moveRight: string[];
    }
}

function isPointerLockControls(json: any): json is PointerLockControls {
    if (!(json instanceof Object)) return false;

    if (typeof json.mesh !== "string") return false;
    if (![1, 2, 3].includes(json.person)) return false;
    if (typeof json.sensitivity !== "number") return false;
    if (typeof json.movementVelocity !== "number") return false;
    if (typeof json.jumpVelocity !== "number") return false;
    if (typeof json.doubleJump !== "boolean") return false;
    if (typeof json.enableJump !== "boolean") return false;
    if (typeof json.enableMove !== "boolean") return false;

    if (!(json.keys instanceof Object)) return false;

    const actions = [
        "jump",
        "moveForward",
        "moveBackward",
        "moveLeft",
        "moveRight",
    ];

    for (const action of actions) {
        if (!Array.isArray(json.keys[action])) return false;
        if (
            json.keys[action].some((item: any) => typeof item !== "string")
        ) return false;
    }

    if (!isControls(json)) return false;

    return true;
}

export type { PointerLockControls };
export { isPointerLockControls };