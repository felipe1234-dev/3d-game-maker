import { Game } from "@local/classes";
import { applyObject3DJSON } from "../utils";
import { Person, FirstPerson, SecondPerson, ThirdPerson } from "./index";
import PointerLockControls from "./PointerLockControls.class";

const lookEvent = { type: "look" };
const disconnectEvent = { type: "disconnect" };
const connectEvent = { type: "connect" };

const jumpEvent = (velocity: number, jumps: number) => ({
    type: "jump",
    velocity,
    jumps
});

const doubleJumpEvent = (velocity: number, jumps: number) => ({
    type: "doubleJump",
    velocity,
    jumps
});

const moveEvent = (
    delta: number,
    velocity: Game.Vector3,
    moveForward: boolean,
    moveBackward: boolean,
    moveLeft: boolean,
    moveRight: boolean
) => ({
    type: "move",
    delta,
    velocity,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
});

const moveLeftEvent = (delta: number, velocity: Game.Vector3) => ({
    type: "moveLeft",
    delta,
    velocityX: velocity.x,
    velocity
});

const moveRightEvent = (delta: number, velocity: Game.Vector3) => ({
    type: "moveRight",
    delta,
    velocityX: velocity.x,
    velocity
});

const moveForwardEvent = (delta: number, velocity: Game.Vector3) => ({
    type: "moveForward",
    delta,
    velocityZ: velocity.z,
    velocity
});

const moveBackwardEvent = (delta: number, velocity: Game.Vector3) => ({
    type: "moveBackward",
    delta,
    velocityZ: velocity.z,
    velocity
});

const updateEvent = (delta: number) => ({
    type: "update",
    delta
});

const PI_2 = Math.PI / 2;

const MIN_F1_ANGLE = 0;
const MAX_F1_ANGLE = Math.PI;

const MIN_F23_ANGLE = -6;
const MAX_F23_ANGLE = 6;

class ClassicalControls extends PointerLockControls {
    public readonly type: "ClassicalControls";

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
    public enableMove: boolean;
    public movementVelocity: number;

    public keys: {
        jump: string[];
        moveForward: string[];
        moveBackward: string[];
        moveLeft: string[];
        moveRight: string[];
    };

    constructor(
        camera: Game.Camera,
        mesh: Game.Mesh
    ) {
        super(camera, mesh);

        this.name = "ClassicalControls";
        this.type = "ClassicalControls";

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

        this.person = SecondPerson;
        this.enableJump = true;
        this.jumpVelocity = 10;
        this.doubleJump = false;
        this.enableMove = true;
        this.movementVelocity = 0.2;
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

    public jump(velocity?: number): void {
        if (!this.canJump) return;

        const inputVelocity = velocity || this.jumpVelocity;

        this.mesh.body.velocity.y = inputVelocity;
        this.jumps++;

        if (this.jumps >= 2) {
            this.dispatchEvent(doubleJumpEvent(inputVelocity, this.jumps));
        } else {
            this.dispatchEvent(jumpEvent(inputVelocity, this.jumps));
        }
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

    public override connect(): void {
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("pointerlockchange", this.onPointerlockChange);
        document.addEventListener("pointerlockerror", this.onPointerlockError);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        this.mesh.body?.addEventListener("collide", this.onCollide);

        this.dispatchEvent(connectEvent);
    }

    public override disconnect(): void {
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("pointerlockchange", this.onPointerlockChange);
        document.removeEventListener("pointerlockerror", this.onPointerlockError);
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);
        this.mesh.body?.removeEventListener("collide", this.onCollide);

        this.dispatchEvent(disconnectEvent);
    }

    public override update(delta: number): void {
        if (!this.isLocked || !this.mesh.body) return;

        delta *= 1000;
        delta *= 0.1;

        const inputVelocity = new Game.Vector3();

        if (this.moveForward) {
            inputVelocity.z = -this.movementVelocity * delta;
            this.dispatchEvent(moveForwardEvent(delta, inputVelocity));
        }
        if (this.moveBackward) {
            inputVelocity.z = this.movementVelocity * delta;
            this.dispatchEvent(moveBackwardEvent(delta, inputVelocity));
        }

        if (this.moveLeft) {
            inputVelocity.x = -this.movementVelocity * delta;
            this.dispatchEvent(moveLeftEvent(delta, inputVelocity));
        }
        if (this.moveRight) {
            inputVelocity.x = this.movementVelocity * delta;
            this.dispatchEvent(moveRightEvent(delta, inputVelocity));
        }

        if (this.isMoving) {
            this.dispatchEvent(
                moveEvent(
                    delta,
                    inputVelocity,
                    this.moveForward,
                    this.moveBackward,
                    this.moveLeft,
                    this.moveRight
                )
            );
        }

        const euler = new Game.Euler(0, 0, 0, "XYZ");
        euler.x = this.camera.rotation.x;
        euler.y = this.camera.rotation.y;

        const quaternion = new Game.Quaternion();
        quaternion.setFromEuler(euler);
        inputVelocity.applyQuaternion(quaternion);

        this.mesh.body.velocity.x += inputVelocity.x;
        this.mesh.body.velocity.z += inputVelocity.z;
        const [prevX, prevY, prevZ] = this.prevPosition.toArray();
        const [currX, currY, currZ] = this.mesh.position.toArray();
        
        const attachedObjects = this.children.filter(child => child !== this.mesh);
        for (const child of attachedObjects) {
            child.position.x += currX - prevX;
            child.position.y += currY - prevY;
            child.position.z += currZ - prevZ;
        }
        
        const cameraPosition = this.camera.position;
        if (this.firstPerson) {
            cameraPosition.copy(this.mesh.position);
        }

        this.prevPosition = this.mesh.position.clone();
        this.dispatchEvent(updateEvent(delta));
    }

    public static override fromJSON(json: Game.Formats.ClassicalControls): ClassicalControls {
        const pointerLockControls = PointerLockControls.fromJSON(json);
        const controls = new ClassicalControls(pointerLockControls.camera, pointerLockControls.mesh);

        applyObject3DJSON(controls, json);

        for (const child of pointerLockControls.children) {
            controls.add(child);
        }

        controls.person = json.object.person;
        controls.sensitivity = json.object.sensitivity;
        controls.movementVelocity = json.object.movementVelocity;
        controls.jumpVelocity = json.object.jumpVelocity;
        controls.doubleJump = json.object.doubleJump;
        controls.enableJump = json.object.enableJump;
        controls.enableMove = json.object.enableMove;
        controls.keys = json.object.keys;

        return controls;
    }

    public override toJSON(): Game.Formats.ClassicalControls {
        const json = super.toJSON();

        return {
            ...json,
            object: {
                ...json.object,
                person: this.person,
                movementVelocity: this.movementVelocity,
                jumpVelocity: this.jumpVelocity,
                doubleJump: this.doubleJump,
                enableJump: this.enableJump,
                enableMove: this.enableMove,
                keys: this.keys
            }
        };
    }
}

export default ClassicalControls;