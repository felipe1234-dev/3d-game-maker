import { Game } from "@local/classes";
import { generateID, metaToMetaAsArray } from "../utils";
import { Person, FirstPerson, SecondPerson, ThirdPerson } from "./index";
import * as THREE from "three";

const lookEvent = { type: "look" };
const lockEvent = { type: "lock" };
const unlockEvent = { type: "unlock" };
const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };
const jumpEvent = { type: "jump" };
const doubleJumpEvent = { type: "doubleJump" };
const moveEvent = { type: "move" };
const moveLeftEvent = { type: "moveLeft" };
const moveRightEvent = { type: "moveRight" };
const moveForwardEvent = { type: "moveForward" };
const moveBackwardEvent = { type: "moveBackward" };
const updateEvent = { type: "update" };

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

    public readonly camera: Game.Camera;
    public readonly mesh: Game.Mesh;
    public readonly children: Game.Object3D[];

    protected moveForward: boolean;
    protected moveBackward: boolean;
    protected moveLeft: boolean;
    protected moveRight: boolean;
    protected jumps: number;
    protected prevPosition: Game.Vector3;

    public keys: {
        jump: string[];
        moveForward: string[];
        moveBackward: string[];
        moveLeft: string[];
        moveRight: string[];
    };

    public person: Person;
    public jumpVelocity: number;
    public enableJump: boolean;
    public doubleJump: boolean;
    public enableMove: boolean;
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
        this.name = "PointerLockControls";
        this.type = "PointerLockControls";

        this.camera = camera;
        this.mesh = mesh;
        this.children = [mesh, camera];

        this.isLocked = false;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.jumps = 0;
        this.prevPosition = mesh.position.clone();

        this.keys = {
            jump: [" "],
            moveForward: ["ArrowUp", "w"],
            moveBackward: ["ArrowDown", "s"],
            moveLeft: ["ArrowLeft", "a"],
            moveRight: ["ArrowRight", "d"],
        };

        this.person = FirstPerson;
        this.enableJump = true;
        this.jumpVelocity = 10;
        this.doubleJump = false;
        this.enableMove = true;
        this.movementVelocity = 0.2;

        this.sensitivity = 1.0;
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

    public get isMoving(): boolean {
        return (
            this.moveForward || this.moveBackward ||
            this.moveLeft || this.moveRight
        );
    }

    public lock(): void {
        document.body.requestPointerLock();
        this.dispatchEvent(lockEvent);
    }

    public unlock(): void {
        document.exitPointerLock();
        this.dispatchEvent(unlockEvent);
    }

    public jump(velocity?: number): void {
        if (!this.canJump) return;

        this.mesh.body.velocity.y = velocity || this.jumpVelocity;
        this.jumps++;

        if (this.jumps >= 2) {
            this.dispatchEvent(doubleJumpEvent);
        } else {
            this.dispatchEvent(jumpEvent);
        }
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
        const key = event.key;

        if (this.keys.jump.includes(key)) {
            this.jump();
        }

        if (!this.enableMove) return;

        if (this.keys.moveForward.includes(key)) {
            this.moveForward = true;
        }

        if (this.keys.moveBackward.includes(key)) {
            this.moveBackward = true;
        }

        if (this.keys.moveLeft.includes(key)) {
            this.moveLeft = true;
        }

        if (this.keys.moveRight.includes(key)) {
            this.moveRight = true;
        }
    }

    protected onKeyUp = (event: KeyboardEvent): void => {
        const key = event.key;

        if (this.keys.moveForward.includes(key)) {
            this.moveForward = false;
        }

        if (this.keys.moveBackward.includes(key)) {
            this.moveBackward = false;
        }

        if (this.keys.moveLeft.includes(key)) {
            this.moveLeft = false;
        }

        if (this.keys.moveRight.includes(key)) {
            this.moveRight = false;
        }
    }

    protected onCollide = (): void => {
        this.jumps = 0;
    }

    public connect(): void {
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("pointerlockchange", this.onPointerlockChange);
        document.addEventListener("pointerlockerror", this.onPointerlockError);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        this.mesh.body?.addEventListener("collide", this.onCollide);

        this.dispatchEvent(connectEvent);
    }

    public disconnect(): void {
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("pointerlockchange", this.onPointerlockChange);
        document.removeEventListener("pointerlockerror", this.onPointerlockError);
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);
        this.mesh.body?.removeEventListener("collide", this.onCollide);

        this.dispatchEvent(disconnectEvent);
    }

    public update(delta: number): void {
        if (!this.isLocked || !this.mesh.body) return;

        delta *= 1000;
        delta *= 0.1;

        const inputVelocity = new Game.Vector3();

        if (this.moveForward) {
            inputVelocity.z = -this.movementVelocity * delta;
            this.dispatchEvent(moveForwardEvent);
        }
        if (this.moveBackward) {
            inputVelocity.z = this.movementVelocity * delta;
            this.dispatchEvent(moveBackwardEvent);
        }

        if (this.moveLeft) {
            inputVelocity.x = -this.movementVelocity * delta;
            this.dispatchEvent(moveLeftEvent);
        }
        if (this.moveRight) {
            inputVelocity.x = this.movementVelocity * delta;
            this.dispatchEvent(moveRightEvent);
        }

        if (this.isMoving) {
            this.dispatchEvent(moveEvent);
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

        this.dispatchEvent(updateEvent);
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
        controls.enableMove = json.enableMove;
        controls.keys = json.keys;

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
            enableJump: this.enableJump,
            enableMove: this.enableMove,
            keys: this.keys
        };
    }
}

export default PointerLockControls;