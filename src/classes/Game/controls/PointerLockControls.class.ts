import { Game } from "@local/classes";
import { generateID, metaToMetaAsArray } from "../utils/private";
import { Person, FirstPerson, SecondPerson, ThirdPerson } from "./index";
import * as THREE from "three";

const lookEvent = { type: "look" };
const lockEvent = { type: "lock" };
const unlockEvent = { type: "unlock" };
const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };
const jumpEvent = { type: "jump" };

const PI_2 = Math.PI / 2;

const MIN_F1_ANGLE = 0;
const MAX_F1_ANGLE = Math.PI;

const MIN_F23_ANGLE = -6;
const MAX_F23_ANGLE = 6;

class PointerLockControls extends THREE.EventDispatcher implements Game.Controls {
    public id: number;
    public uuid: string;
    public name: string;
    public readonly type: "PointerLockControls";

    public camera: Game.Camera;
    public mesh: Game.Mesh;

    protected moveForward: boolean;
    protected moveBackward: boolean;
    protected moveLeft: boolean;
    protected moveRight: boolean;
    protected jumps: number;
    protected prevPosition: Game.Vector3;

    public person: Person;
    public jumpVelocity: number;
    public enableJump: boolean;
    public doubleJump: boolean;
    public movementVelocity: number;
    public sensitivity: number;

    public isLocked: boolean;

    constructor(
        camera: Game.Camera,
        mesh: Game.Mesh
    ) {
        super();

        this.id = generateID();
        this.uuid = Game.MathUtils.generateUUID();
        this.name = "";
        this.type = "PointerLockControls";

        this.camera = camera;
        this.mesh = mesh;

        this.isLocked = false;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.jumps = 0;
        this.prevPosition = mesh.position.clone();

        this.person = FirstPerson;
        this.enableJump = true;
        this.jumpVelocity = 10;
        this.doubleJump = false;
        this.movementVelocity = 0.2;

        this.sensitivity = 1.0;

        this.connect();
    }

    public set firstPerson(bool: boolean) {
        if (!bool) return;

        this.person = FirstPerson;
    }

    public get firstPerson(): boolean {
        return this.person === FirstPerson;
    }

    public set secondPerson(bool: boolean) {
        if (!bool) return;

        this.person = SecondPerson;
    }

    public get secondPerson(): boolean {
        return this.person === SecondPerson;
    }

    public set thirdPerson(bool: boolean) {
        if (!bool) return;
        this.person = ThirdPerson;
    }

    public get thirdPerson(): boolean {
        return this.person === ThirdPerson;
    }

    public get canJump(): boolean {
        return !!(
            (
                (this.doubleJump && this.jumps < 2) ||
                (!this.doubleJump && this.jumps < 1)
            ) && this.mesh.body && this.enableJump
        );
    }

    public lock(): void {
        document.body.requestPointerLock();
    }

    public unlock(): void {
        document.exitPointerLock();
    }

    public jump(velocity?: number): void {
        if (!this.canJump) return;

        this.mesh.body.velocity.y = velocity || this.jumpVelocity;
        this.jumps++;

        this.dispatchEvent(jumpEvent);
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

    protected onMouseMove = (event: MouseEvent): void => {
        if (!this.isLocked) return;

        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        if (this.firstPerson) {
            const rotationFactor = 0.002;

            const euler = new Game.Euler();
            euler.setFromQuaternion(this.camera.quaternion);

            euler.y -= movementX * rotationFactor * this.sensitivity;
            euler.x -= movementY * rotationFactor * this.sensitivity;
            euler.x = Math.max(
                PI_2 - MAX_F1_ANGLE,
                Math.min(PI_2 - MIN_F1_ANGLE, euler.x)
            );

            this.camera.quaternion.setFromEuler(euler);
        } else if (this.secondPerson || this.thirdPerson) {
            const cameraPosition = this.camera.position;
            const rotationFactor = 0.02;

            const vector = new Game.Vector3();
            vector.copy(cameraPosition);

            vector.y -= movementY * rotationFactor * this.sensitivity;
            vector.y = Math.max(MIN_F23_ANGLE, Math.min(MAX_F23_ANGLE, vector.y));

            vector.x -= movementX * rotationFactor * this.sensitivity;
            vector.x = Math.max(MIN_F23_ANGLE, Math.min(MAX_F23_ANGLE, vector.x));

            cameraPosition.copy(vector);
            this.camera.lookAt(this.mesh.position);
        }

        this.dispatchEvent(lookEvent);
    }

    protected onKeyDown = (event: KeyboardEvent): void => {
        switch (event.code) {
            case "KeyW":
            case "ArrowUp":
                this.moveForward = true;
                break;

            case "KeyA":
            case "ArrowLeft":
                this.moveLeft = true;
                break;

            case "KeyS":
            case "ArrowDown":
                this.moveBackward = true;
                break;

            case "KeyD":
            case "ArrowRight":
                this.moveRight = true;
                break;

            case "Space":
                this.jump();
                break;

            default:
                break;
        }
    }

    protected onKeyUp = (event: KeyboardEvent): void => {
        switch (event.code) {
            case "KeyW":
            case "ArrowUp":
                this.moveForward = false;
                break;

            case "KeyA":
            case "ArrowLeft":
                this.moveLeft = false;
                break;

            case "KeyS":
            case "ArrowDown":
                this.moveBackward = false;
                break;

            case "KeyD":
            case "ArrowRight":
                this.moveRight = false;
                break;

            default:
                break;
        }
    }

    public connect(): void {
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("pointerlockchange", this.onPointerlockChange);
        document.addEventListener("pointerlockerror", this.onPointerlockError);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);

        this.mesh.body?.addEventListener("collide", () => {
            this.jumps = 0;
        });

        this.dispatchEvent(connectEvent);
    }

    public disconnect(): void {
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("pointerlockchange", this.onPointerlockChange);
        document.removeEventListener("pointerlockerror", this.onPointerlockError);
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);

        this.dispatchEvent(disconnectEvent);
    }

    public update(delta: number): void {
        if (!this.isLocked || !this.mesh.body) return;

        delta *= 1000;
        delta *= 0.1;

        const inputVelocity = new Game.Vector3();

        if (this.moveForward) {
            inputVelocity.z = -this.movementVelocity * delta;
        }
        if (this.moveBackward) {
            inputVelocity.z = this.movementVelocity * delta;
        }

        if (this.moveLeft) {
            inputVelocity.x = -this.movementVelocity * delta;
        }
        if (this.moveRight) {
            inputVelocity.x = this.movementVelocity * delta;
        }

        const euler = new Game.Euler(0, 0, 0, "XYZ");
        euler.x = this.camera.rotation.x;
        euler.y = this.camera.rotation.y;

        const quaternion = new Game.Quaternion();
        quaternion.setFromEuler(euler);
        inputVelocity.applyQuaternion(quaternion);

        this.mesh.body.velocity.x += inputVelocity.x;
        this.mesh.body.velocity.z += inputVelocity.z;

        const cameraPosition = this.camera.position;

        if (this.firstPerson) {
            cameraPosition.copy(this.mesh.position);
        } else if (this.secondPerson || this.thirdPerson) {
            const [prevX, prevY, prevZ] = this.prevPosition.toArray();
            const [currX, currY, currZ] = this.mesh.position.toArray();

            cameraPosition.x += currX - prevX;
            cameraPosition.y += currY - prevY;
            cameraPosition.z += currZ - prevZ;
        }

        this.prevPosition = this.mesh.position.clone();
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
        controls.person = json.person;
        controls.sensitivity = json.sensitivity;
        controls.movementVelocity = json.movementVelocity;
        controls.jumpVelocity = json.jumpVelocity;
        controls.doubleJump = json.doubleJump;
        controls.enableJump = json.enableJump;

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
            person: this.person,
            sensitivity: this.sensitivity,
            movementVelocity: this.movementVelocity,
            jumpVelocity: this.jumpVelocity,
            doubleJump: this.doubleJump,
            enableJump: this.enableJump
        };
    }
}

export default PointerLockControls;