import { Game } from "@local/classes";
import { applyObject3DJSON } from "../utils";
import BaseControls from "./BaseControls.class";

const lockEvent = { type: "lock" };
const unlockEvent = { type: "unlock" };
const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };
const updateEvent = (delta: number) => ({ type: "update", delta });

class PointerLockControls extends BaseControls {
    public readonly type: typeof Game.Libs.controls[number];
    public readonly mesh: Game.Mesh;

    public sensitivity: number;
    public isLocked: boolean;

    protected constructor(
        camera: Game.Camera,
        mesh: Game.Mesh
    ) {
        super(camera);

        this.name = "PointerLockControls";
        this.type = "PointerLockControls";
        this.mesh = mesh;
        this.add(mesh);
        this.sensitivity = 1.0;
        this.isLocked = false;
    }

    public lock(): void {
        document.body.requestPointerLock();
        this.dispatchEvent(lockEvent);
    }

    public unlock(): void {
        document.exitPointerLock();
        this.dispatchEvent(unlockEvent);
    }

    protected onPointerlockChange = (): void => {
        if (document.pointerLockElement) {
            this.dispatchEvent(lockEvent);
            this.isLocked = true;
        } else {
            this.dispatchEvent(unlockEvent);
            this.isLocked = false;
        }
    }

    protected onPointerlockError = (): void => {
        console.error("Game.PointerLockControls: Unable to use Pointer Lock API");
    }

    public connect(): void {
        document.addEventListener("pointerlockchange", this.onPointerlockChange);
        document.addEventListener("pointerlockerror", this.onPointerlockError);
        this.dispatchEvent(connectEvent);
    }

    public disconnect(): void {
        document.removeEventListener("pointerlockchange", this.onPointerlockChange);
        document.removeEventListener("pointerlockerror", this.onPointerlockError);
        this.dispatchEvent(disconnectEvent);
    }

    public update(delta: number): void {
        if (!this.isLocked || !this.mesh.body) return;

        delta *= 1000;
        delta *= 0.1;

        this.dispatchEvent(updateEvent(delta));
    }

    public static fromJSON(json: Game.Formats.PointerLockControls): PointerLockControls {
        const baseControls = BaseControls.fromJSON(json);
        const mesh = baseControls.children.find(child => child.uuid === json.object.mesh) as Game.Mesh;
        const controls = new PointerLockControls(baseControls.camera, mesh);

        applyObject3DJSON(controls, json);

        for (const child of baseControls.children) {
            controls.add(child);
        }
        
        controls.sensitivity = json.object.sensitivity;

        return controls;
    }

    public toJSON(): Game.Formats.PointerLockControls {
        const json = super.toJSON();
        return {
            ...json,
            object: {
                ...json.object,
                mesh: this.mesh.uuid,
                sensitivity: this.sensitivity,
            }
        };
    }
}

export default PointerLockControls;