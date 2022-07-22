import {
    EventDispatcher,
    Matrix4,
    Plane,
    Raycaster,
    Vector2,
    Vector3,
    Object3D,
    Camera,
    Intersection
} from "three";

class DragControls extends EventDispatcher {
    public objects: Array<Object3D>;
    public camera: Camera;
    public domElement: HTMLCanvasElement;
    public readonly isDragControls: true;
    public enabled: boolean;
    public transformGroup: boolean;
    public selected?: Object3D | null;
    public hovered?: Object3D | null;
    
    public readonly intersections: Array<Intersection>;
    public readonly intersection: Vector3;
    
    protected readonly plane: Plane;
    protected readonly raycaster: Raycaster;
    protected readonly pointer: Vector2;
    protected readonly offset: Vector3;
    protected readonly worldPosition: Vector3;
    protected readonly inverseMatrix: Matrix4;

    constructor(
        objects: Array<Object3D>, 
        camera: Camera, 
        domElement: HTMLCanvasElement
    ) {
        super();
        
        this.objects = objects;
        this.camera = camera;
        this.domElement = domElement;
        this.domElement.style.touchAction = "none"; // disable touch scroll
        this.isDragControls = true;
        
        this.selected = null; 
        this.hovered = null;
        
        this.enabled = true;
        this.transformGroup = false;

        this.intersections = [];
        
        this.plane = new Plane();
        this.raycaster = new Raycaster();
        this.pointer = new Vector2();
        this.offset = new Vector3();
        this.intersection = new Vector3();
        this.worldPosition = new Vector3();
        this.inverseMatrix = new Matrix4();

        this.activate();
    }
    
    public activate = () => {
        this.domElement.addEventListener("pointermove", this.onPointerMove);
        this.domElement.addEventListener("pointerdown", this.onPointerDown);
        this.domElement.addEventListener("pointerup", this.onPointerCancel);
        this.domElement.addEventListener("pointerleave", this.onPointerCancel);
    }

    public deactivate = () => {
        this.domElement.removeEventListener("pointermove", this.onPointerMove);
        this.domElement.removeEventListener("pointerdown", this.onPointerDown);
        this.domElement.removeEventListener("pointerup", this.onPointerCancel);
        this.domElement.removeEventListener("pointerleave", this.onPointerCancel);
        this.domElement.style.cursor = "";
    }

    public dispose = () => {
        this.deactivate();
    }
    
    protected onPointerMove = (event: PointerEvent) => {
        if (!this.enabled) {
            return;
        }
        
        this.updatePointer(event);
        this.raycaster.setFromCamera(this.pointer, this.camera);
    
        if (this.selected) {
            if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
                this.selected.position.copy(
                    this.intersection
                        .sub(this.offset)
                        .applyMatrix4(this.inverseMatrix)
                );
            }
            this.dispatchEvent({ type: "drag", object: this.selected });
            return;
        }
    
        // hover support
    
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
            this.intersections.length = 0;
    
            this.raycaster.setFromCamera(this.pointer, this.camera);
            this.raycaster.intersectObjects(this.objects, true, this.intersections);
    
            if (this.intersections.length > 0) {
                const object = this.intersections[0].object;
                this.plane.setFromNormalAndCoplanarPoint(
                    this.camera.getWorldDirection(this.plane.normal), 
                    this.worldPosition.setFromMatrixPosition(object.matrixWorld)
                );
    
                if (this.hovered !== object && this.hovered) {
                    this.dispatchEvent({ type: "hoveroff", object: this.hovered });
                    this.domElement.style.cursor = "auto";
                    this.hovered = null;
                }
    
                if (this.hovered !== object) {
                    this.dispatchEvent({ type: "hoveron", object: object });
                    this.domElement.style.cursor = "pointer";
                    this.hovered = object;
                }
            } else {
                if (this.hovered) {
                    this.dispatchEvent({ type: "hoveroff", object: this.hovered });
                    this.domElement.style.cursor = "auto";
                    this.hovered = null;
                }
            }
        }
    }
    
    protected onPointerDown = (event: PointerEvent) => {
        if (!this.enabled) {
            return;
        }
        
        this.updatePointer(event);
        this.intersections.length = 0;
        this.raycaster.setFromCamera(this.pointer, this.camera);
        this.raycaster.intersectObjects(this.objects, true, this.intersections);
    
        if (this.intersections.length > 0) {
            this.selected = (
                this.transformGroup
                    ? this.objects[0] 
                    : this.intersections[0].object
            );
            this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.plane.normal), this.worldPosition.setFromMatrixPosition(this.selected.matrixWorld));
    
            if (this.raycaster.ray.intersectPlane(this.plane, this.intersection) && this.selected) {
                this.inverseMatrix.copy(
                    this.selected.parent!.matrixWorld
                ).invert();
                this.offset
                    .copy(this.intersection)
                    .sub(
                        this.worldPosition.setFromMatrixPosition(this.selected.matrixWorld)
                    );
            }
    
            this.domElement.style.cursor = "move";
            this.dispatchEvent({ type: "dragstart", object: this.selected });
        }
    }

    protected onPointerCancel = () => {
        if (!this.enabled) {
            return;
        }
        
        if (this.selected) {
            this.dispatchEvent({ type: "dragend", object: this.selected });
            this.selected = null;
        }

        this.domElement.style.cursor = this.hovered ? "pointer" : "auto";
    }

    protected updatePointer = (event: PointerEvent) => {
        const rect = this.domElement.getBoundingClientRect();

        this.pointer.x = (event.clientX - rect.left)/rect.width * 2 - 1;
        this.pointer.y = - (event.clientY - rect.top)/rect.height * 2 + 1;
    }
}

export default DragControls;