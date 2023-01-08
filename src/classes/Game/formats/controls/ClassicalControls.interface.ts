import { isPointerLockControls, PointerLockControls } from "./PointerLockControls.interface";

interface ClassicalControls extends PointerLockControls {
    object: {
        person: 1 | 2 | 3;
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
    } & PointerLockControls["object"]
}

function isClassicalControls(json: any): json is ClassicalControls {
    if (!(json instanceof Object)) return false;
    if (!(json.object instanceof Object)) return false;

    if (json.object.type !== "ClassicalControls") return false;
    if (![1, 2, 3].includes(json.object.person)) return false;
    if (typeof json.object.movementVelocity !== "number") return false;
    if (typeof json.object.jumpVelocity !== "number") return false;
    if (typeof json.object.doubleJump !== "boolean") return false;
    if (typeof json.object.enableJump !== "boolean") return false;
    if (typeof json.object.enableMove !== "boolean") return false;

    if (!(json.object.keys instanceof Object)) return false;

    const actions = [
        "jump",
        "moveForward",
        "moveBackward",
        "moveLeft",
        "moveRight",
    ];

    for (const action of actions) {
        if (!Array.isArray(json.object.keys[action])) return false;
        if (
            json.object.keys[action].some((item: any) => typeof item !== "string")
        ) return false;
    }

    if (!isPointerLockControls({
        ...json,
        object: {
            ...json.object,
            type: "PointerLockControls"
        }
    })) return false;

    return true;
}

export type { ClassicalControls };
export { isClassicalControls };