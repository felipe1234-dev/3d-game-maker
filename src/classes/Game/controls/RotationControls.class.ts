import { Game } from "@local/classes";

const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };

class RotationControls extends Game.PointerLockControls implements Game.Controls {
    public readonly type: "RotationControls";
    protected readonly cursor: Game.BaseObject3D;

    constructor(camera: Game.Camera, mesh: Game.Mesh) {
        super(camera, mesh);

        this.name = "RotationControls";
        this.type = "RotationControls";
        this.cursor = new Game.BaseObject3D();
    }

    protected onMouseMove = (event: MouseEvent): void => {
        if (!this.isLocked) return;
        
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        const cursorPosition = this.cursor.position;
        const rotationFactor = 0.02;

        const vector = new Game.Vector3();
        vector.copy(cursorPosition);

        vector.y -= movementY * rotationFactor * this.sensitivity;
        //vector.y = Math.max(MIN_F23_ANGLE, Math.min(MAX_F23_ANGLE, vector.y));

        vector.x -= movementX * rotationFactor * this.sensitivity;
        //vector.x = Math.max(MIN_F23_ANGLE, Math.min(MAX_F23_ANGLE, vector.x));

        cursorPosition.copy(vector);

        this.mesh.lookAt(cursorPosition);
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

    public override toJSON(): Game.Formats.RotationControls {
        const json = super.toJSON();
        return json;
    }
}

export default RotationControls;