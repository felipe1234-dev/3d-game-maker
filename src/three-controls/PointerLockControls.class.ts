import {
    Euler,
    EventDispatcher,
    Vector3,
    Camera
} from "three";

const euler = new Euler( 0, 0, 0, "YXZ" );
const vector = new Vector3();

const changeEvent = { type: "change" };
const lockEvent = { type: "lock" };
const unlockEvent = { type: "unlock" };

const PI_2 = Math.PI/2;

class PointerLockControls extends EventDispatcher {
    public domElement: HTMLCanvasElement;
    public camera: Camera;
    public readonly isPointerLockControls: true;
    public isLocked: boolean;
    public minPolarAngle: number;
    public maxPolarAngle: number;
    public pointerSpeed: number;
    
    constructor(camera: Camera, domElement: HTMLCanvasElement) {
        super();

        this.camera = camera;
        this.domElement = domElement;
        this.isPointerLockControls = true;
        this.isLocked = false;

        // Set to constrain the pitch of the camera
        // Range is 0 to Math.PI radians
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians
        this.pointerSpeed = 1.0;
        
        this.connect();
    }

    protected onMouseMove = (event: MouseEvent): void => {
        if (!this.isLocked) {
            return;
        }
        
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        euler.setFromQuaternion(this.camera.quaternion);
        euler.y -= movementX * 0.002 * this.pointerSpeed;
        euler.x -= movementY * 0.002 * this.pointerSpeed;
        euler.x = Math.max(
            PI_2 - this.maxPolarAngle, 
            Math.min(PI_2 - this.minPolarAngle, euler.x)
        );

        this.camera.quaternion.setFromEuler(euler);

        this.dispatchEvent(changeEvent);
    }
    
    protected onPointerlockChange = (): void => {
        if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
            this.dispatchEvent(lockEvent);
            this.isLocked = true;
        } else {
            this.dispatchEvent(unlockEvent);
            this.isLocked = false;
        }
    }

    protected onPointerlockError = (): void => {
        console.error( "THREE.PointerLockControls: Unable to use Pointer Lock API" );
    }
    
    public connect(): void {
        this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove);
        this.domElement.ownerDocument.addEventListener("pointerlockchange", this.onPointerlockChange);
        this.domElement.ownerDocument.addEventListener("pointerlockerror", this.onPointerlockError);
    }

    public disconnect(): void {
        this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove);
        this.domElement.ownerDocument.removeEventListener("pointerlockchange", this.onPointerlockChange);
        this.domElement.ownerDocument.removeEventListener("pointerlockerror", this.onPointerlockError);
    }

    public dispose(): void {
        this.disconnect();
    }

    public getDirection(v: Vector3): Vector3 {
        const direction = new Vector3(0, 0, -1);
        return v.copy(direction).applyQuaternion(this.camera.quaternion);
    }

    public moveForward(distance: number): void {
        // move forward parallel to the xz-plane
        // assumes this.camera.up is y-up
        
        vector.setFromMatrixColumn(this.camera.matrix, 0);
        vector.crossVectors(this.camera.up, vector);
        this.camera.position.addScaledVector(vector, distance);
    }

    public moveRight(distance: number): void {
        vector.setFromMatrixColumn(this.camera.matrix, 0);
        this.camera.position.addScaledVector(vector, distance);
    }

    public lock(): void {
        this.domElement.requestPointerLock();
    }

    public unlock(): void {
        this.domElement.ownerDocument.exitPointerLock();
    }
}

export default PointerLockControls;