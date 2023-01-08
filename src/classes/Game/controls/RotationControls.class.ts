import { Game } from "@local/classes";
import { applyObject3DJSON } from "../utils";
import PointerLockControls from "./PointerLockControls.class";

const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };
const rotateEvent = { type: "rotate" };

class RotationControls extends PointerLockControls {
    public readonly type: "RotationControls";

    constructor(camera: Game.Camera, mesh: Game.Mesh) {
        super(camera, mesh);

        this.name = "RotationControls";
        this.type = "RotationControls";
    }

    protected onMouseMove = (event: MouseEvent): void => {
        if (!this.isLocked) return;

        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        const rotationFactor = 0.002;

        const euler = new Game.Euler();
        euler.setFromQuaternion(this.mesh.quaternion);

        euler.y -= movementX * rotationFactor * this.sensitivity;
        euler.x -= movementY * rotationFactor * this.sensitivity;

        this.mesh.quaternion.setFromEuler(euler);

        this.dispatchEvent(rotateEvent);
    }

    public override connect(): void {
        document.addEventListener("pointerlockchange", this.onPointerlockChange);
        document.addEventListener("pointerlockerror", this.onPointerlockError);
        document.addEventListener("mousemove", this.onMouseMove);
        this.dispatchEvent(connectEvent);
    }

    public override disconnect(): void {
        document.removeEventListener("pointerlockchange", this.onPointerlockChange);
        document.removeEventListener("pointerlockerror", this.onPointerlockError);
        document.removeEventListener("mousemove", this.onMouseMove);
        this.dispatchEvent(disconnectEvent);
    }

    public static override fromJSON(json: Game.Formats.RotationControls): RotationControls {
        const pointerLockControls = PointerLockControls.fromJSON(json);        
        const controls = new RotationControls(pointerLockControls.camera, pointerLockControls.mesh);

        applyObject3DJSON(controls, json);
        
        for (const child of pointerLockControls.children) {
            controls.add(child);
        }

        return controls;
    }

    public override toJSON(): Game.Formats.RotationControls {
        const json = super.toJSON();
        return json;
    }
}

export default RotationControls;