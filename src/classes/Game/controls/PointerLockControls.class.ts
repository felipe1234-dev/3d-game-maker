import { Game } from "@local/classes";
import { metaToMetaAsArray } from "../utils";
import BaseControls from "./BaseControls.class";

const lockEvent = { type: "lock" };
const unlockEvent = { type: "unlock" };
const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };
const updateEvent = (delta: number) => ({ type: "update", delta });

class PointerLockControls extends BaseControls {
    public readonly type: typeof Game.Libs.controls[number];

    public sensitivity: number;
    public isLocked: boolean;

    protected constructor(
        camera: Game.Camera,
        mesh: Game.Mesh
    ) {
        super(camera, mesh);

        this.name = "PointerLockControls";
        this.type = "PointerLockControls";

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

    public static fromJSON(
        json: Game.Formats.PointerLockControls,
        meta: Game.Formats.Meta & {
            objects: {
                [uuid: string]: Game.Formats.Object3D["object"]
            }
        }
    ): PointerLockControls | undefined {
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

        const controls = new PointerLockControls(camera, mesh);

        controls.id = json.id;
        controls.uuid = json.uuid;
        controls.name = json.name;
        controls.sensitivity = json.sensitivity;

        return controls;
    }

    public toJSON(): Game.Formats.PointerLockControls {
        return {
            id: this.id,
            uuid: this.uuid,
            type: this.type,
            name: this.name,
            camera: this.camera.uuid,
            mesh: this.mesh.uuid,
            sensitivity: this.sensitivity,
        };
    }
}

export default PointerLockControls;