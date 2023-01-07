import { Game } from "@local/classes";
import { metaToMetaAsArray } from "../utils";
import PointerLockControls from "./PointerLockControls.class";

const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };
const rotateEvent = { type: "rotate" };

class RotationControls extends PointerLockControls {
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

        console.log("rotate")

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

        console.log("cursorPosition", cursorPosition);

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

    public static override fromJSON(
        json: Game.Formats.RotationControls,
        meta: Game.Formats.Meta & {
            objects: {
                [uuid: string]: Game.Formats.Object3D["object"]
            }
        }
    ): RotationControls | undefined {
        const cameraUid = json.camera;
        const cameraJson = {
            ...metaToMetaAsArray(meta),
            object: meta.objects[cameraUid]
        };
        let camera: Game.Camera | undefined = undefined;

        for (const type of Game.Libs.cameras) {
            if (Game.Formats[`is${type}`](cameraJson)) {
                // @ts-ignore
                camera = Game[type].fromJSON(cameraJson);
            }
        }

        if (!camera) return undefined;

        const meshUid = json.mesh;
        const meshJson = {
            ...metaToMetaAsArray(meta),
            object: meta.objects[meshUid]
        };
        let mesh: Game.Mesh | undefined = undefined;

        if (Game.Formats.isMesh(meshJson)) {
            mesh = Game.Mesh.fromJSON(meshJson);
        }

        if (!mesh) return undefined;

        const controls = new RotationControls(camera, mesh);

        return controls;
    }

    public override toJSON(): Game.Formats.RotationControls {
        const json = super.toJSON();
        return json;
    }
}

export default RotationControls;