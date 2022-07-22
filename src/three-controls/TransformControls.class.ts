import * as THREE from "three";

class TransformControls extends THREE.Object3D {
    public camera: THREE.Camera;
    public domElement: HTMLElement;
    public readonly isTransformControls: true;
    public visible: boolean;
    public object?: THREE.Object3D;
    public enabled: boolean;
    public axis?: string;
    public mode: "translate" | "rotate" | "scale";
    public translationSnap?: number;
    public rotationSnap?: number;
    public space: string;
    public size: number;
    public dragging: boolean;
    public showX: boolean;
    public showY: boolean;
    public showZ: boolean;

    public gizmo: TransformControlsGizmo;
    public plane: TransformControlsPlane;

    public parentQuaternion: THREE.Quaternion;

    public worldPosition: THREE.Vector3;
    public worldPositionStart: THREE.Vector3;

    public worldQuaternion: THREE.Quaternion;
    public worldQuaternionStart: THREE.Quaternion;

    public cameraPosition: THREE.Vector3;
    public cameraQuaternion: THREE.Quaternion;

    public pointStart: THREE.Vector3;
    public pointEnd: THREE.Vector3;

    public rotationAxis: THREE.Vector3;
    public rotationAngle: number;

    public eye: THREE.Vector3;

    protected changeEvent: {
        type: string;
        mode: "translate" | "rotate" | "scale";
    };
    protected mouseDownEvent: {
        type: string;
        mode: "translate" | "rotate" | "scale";
    };
    protected mouseUpEvent: {
        type: string;
        mode: "translate" | "rotate" | "scale";
    };
    protected objectChangeEvent: {
        type: string;
        mode: "translate" | "rotate" | "scale";
    };

    protected ray: THREE.Raycaster;

    protected tempVector: THREE.Vector3;
    protected tempVector2: THREE.Vector3;
    protected tempQuaternion: THREE.Quaternion;

    protected unit: { 
        [key: string]: THREE.Vector3;
    };
    protected identityQuaternion: THREE.Quaternion;
    protected alignVector: THREE.Vector3;

    protected cameraScale: THREE.Vector3;

    protected parentPosition: THREE.Vector3;
    protected parentScale: THREE.Vector3;

    protected worldScaleStart: THREE.Vector3;
    protected worldScale: THREE.Vector3;

    protected positionStart: THREE.Vector3;
    protected quaternionStart: THREE.Quaternion;
    protected scaleStart: THREE.Vector3;

    constructor(camera: THREE.Camera, domElement: HTMLElement) {
        super();

        this.camera = camera;
        this.domElement = domElement;
        this.isTransformControls = true;
        this.visible = false;
        this.enabled = true;
        this.mode = "translate";
        this.space = "world";
        this.size = 1;
        this.dragging = false;
        this.showX = true;
        this.showY = true;
        this.showZ = true;

        this.gizmo = new TransformControlsGizmo(this);
        this.add(this.gizmo);

        this.plane = new TransformControlsPlane(this);
        this.add(this.plane);

        this.changeEvent = {
            type: "change",
            mode: this.mode
        };
        this.mouseDownEvent = {
            type: "mouseDown",
            mode: this.mode
        };
        this.mouseUpEvent = {
            type: "mouseUp",
            mode: this.mode
        };
        this.objectChangeEvent = {
            type: "objectChange",
            mode: this.mode
        };

        // Reusable utility variables

        this.ray = new THREE.Raycaster();

        this.tempVector = new THREE.Vector3();
        this.tempVector2 = new THREE.Vector3();
        this.tempQuaternion = new THREE.Quaternion();
        this.unit = {
            X: new THREE.Vector3(1, 0, 0),
            Y: new THREE.Vector3(0, 1, 0),
            Z: new THREE.Vector3(0, 0, 1)
        };
        this.identityQuaternion = new THREE.Quaternion();
        this.alignVector = new THREE.Vector3();

        this.cameraScale = new THREE.Vector3();

        this.parentPosition = new THREE.Vector3();
        this.parentScale = new THREE.Vector3();

        this.worldScaleStart = new THREE.Vector3();

        this.worldScale = new THREE.Vector3();

        this.eye = new THREE.Vector3();

        this.positionStart = new THREE.Vector3();
        this.quaternionStart = new THREE.Quaternion();
        this.scaleStart = new THREE.Vector3();

        // TODO: remove properties unused in plane and gizmo

        this.parentQuaternion = new THREE.Quaternion();

        this.worldPosition = new THREE.Vector3();
        this.worldPositionStart = new THREE.Vector3();

        this.worldQuaternion = new THREE.Quaternion();
        this.worldQuaternionStart = new THREE.Quaternion();

        this.cameraPosition = new THREE.Vector3();
        this.cameraQuaternion = new THREE.Quaternion();

        this.pointStart = new THREE.Vector3();
        this.pointEnd = new THREE.Vector3();

        this.rotationAxis = new THREE.Vector3();
        this.rotationAngle = 0;

        this.eye = new THREE.Vector3();

        this.domElement.addEventListener("mousedown", this.onPointerDown, false);
        this.domElement.addEventListener("touchstart", this.onPointerDown, false);
        this.domElement.addEventListener("mousemove", this.onPointerHover, false);
        this.domElement.addEventListener("touchmove", this.onPointerHover, false);
        this.domElement.addEventListener("touchmove", this.onPointerMove, false);
        document.addEventListener("mouseup", this.onPointerUp, false);
        this.domElement.addEventListener("touchend", this.onPointerUp, false);
        this.domElement.addEventListener("touchcancel", this.onPointerUp, false);
        this.domElement.addEventListener("touchleave", this.onPointerUp, false);
        this.domElement.addEventListener("contextmenu", this.onContext, false);
    }

    public dispose = (): void => {
        this.domElement.removeEventListener("mousedown", this.onPointerDown);
        this.domElement.removeEventListener("touchstart", this.onPointerDown);
        this.domElement.removeEventListener("mousemove", this.onPointerHover);
        this.domElement.removeEventListener("touchmove", this.onPointerHover);
        this.domElement.removeEventListener("touchmove", this.onPointerMove);
        document.removeEventListener("mouseup", this.onPointerUp);
        this.domElement.removeEventListener("touchend", this.onPointerUp);
        this.domElement.removeEventListener("touchcancel", this.onPointerUp);
        this.domElement.removeEventListener("touchleave", this.onPointerUp);
        this.domElement.removeEventListener("contextmenu", this.onContext);
    }

    // Set current object
    public attach = (object: THREE.Object3D): this => {
        this.object = object;
        this.visible = true;

        return this;
    }

    // Detatch from object
    public detach = (): void => {
        this.object = undefined;
        this.visible = false;
        this.axis = undefined;
    }

    // updateMatrixWorld  updates key transformation variables
    public updateMatrixWorld = (): void => {
        if (this.object) {
            this.object.updateMatrixWorld();
            this.object.parent?.matrixWorld.decompose(
                this.parentPosition,
                this.parentQuaternion,
                this.parentScale
            );
            this.object.matrixWorld.decompose(
                this.worldPosition,
                this.worldQuaternion,
                this.worldScale
            );
        }

        this.camera.updateMatrixWorld();
        this.camera.matrixWorld.decompose(
            this.cameraPosition,
            this.cameraQuaternion,
            this.cameraScale
        );

        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize();
        } else if (this.camera instanceof THREE.OrthographicCamera) {
            this.eye.copy(this.cameraPosition).normalize();
        }

        super.updateMatrixWorld();
    }

    protected pointerHover = (pointer: PointerEvent): void => {
        if (
            !this.object ||
            this.dragging ||
            (pointer.button !== undefined && pointer.button !== 0)
        ) return;

        this.ray.setFromCamera(pointer, this.camera);

        let intersect = this.ray.intersectObjects(
            this.gizmo.picker[this.mode].children,
            true
        )[0] || undefined;

        if (intersect) {
            this.axis = intersect.object.name as typeof this.axis;
        } else {
            this.axis = undefined;
        }

    }

    protected pointerDown = (pointer: MouseEvent): void => {
        if (
            !this.object ||
            this.dragging ||
            (pointer.button !== undefined && pointer.button !== 0)
        ) return;

        if (
            (pointer.button === 0 || !pointer.button) &&
            this.axis
        ) {
            this.ray.setFromCamera(pointer, this.camera);

            let planeIntersect = this.ray.intersectObjects([
                this.plane
            ], true)[0] || undefined;

            if (planeIntersect) {
                let space = this.space;

                if (this.mode === "scale") {
                    space = "local";
                } else if (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") {
                    space = "world";
                }

                if (space === "local" && this.mode === "rotate") {
                    const snap = this.rotationSnap;

                    if (this.axis === "X" && snap)
                        this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;

                    if (this.axis === "Y" && snap)
                        this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;

                    if (this.axis === "Z" && snap)
                        this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;
                }

                this.object.updateMatrixWorld();
                this.object.parent?.updateMatrixWorld();

                this.positionStart.copy(this.object.position);
                this.quaternionStart.copy(this.object.quaternion);
                this.scaleStart.copy(this.object.scale);

                this.object.matrixWorld.decompose(
                    this.worldPositionStart,
                    this.worldQuaternionStart,
                    this.worldScaleStart
                );

                this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);

                if (space === "local")
                    this.pointStart.applyQuaternion(
                        this.worldQuaternionStart.clone().invert()
                    );

            }

            this.dragging = true;
            this.mouseDownEvent.mode = this.mode;
            this.dispatchEvent(this.mouseDownEvent);

        }

    }

    protected pointerMove = (pointer: PointerEvent): void => {
        let axis = this.axis;
        let mode = this.mode;
        let object = this.object;
        let space = this.space;

        if (mode === "scale") {
            space = "local";
        } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
            space = "world";
        }
        
        if (
            !object || !axis ||
            !this.dragging ||
            (pointer.button !== undefined && pointer.button !== 0)
        ) return;
        
        
        this.ray.setFromCamera(pointer, this.camera);

        const planeIntersect = this.ray.intersectObjects([this.plane], true)[0] || undefined;

        if (!planeIntersect) return;

        this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);

        if (space === "local")
            this.pointEnd.applyQuaternion(
                this.worldQuaternionStart.clone().invert()
            );

        if (mode === "translate") {
            if (axis.search("X") === -1) {
                this.pointEnd.x = this.pointStart.x;
            }
            if (axis.search("Y") === -1) {
                this.pointEnd.y = this.pointStart.y;
            }
            if (axis.search("Z") === -1) {
                this.pointEnd.z = this.pointStart.z;
            }

            // Apply translate

            if (space === "local") {
                object.position
                    .copy(this.pointEnd)
                    .sub(this.pointStart)
                    .applyQuaternion(this.quaternionStart);
            } else {
                object.position.copy(this.pointEnd).sub(this.pointStart);
            }

            object.position.add(this.positionStart);

            // Apply translation snap

            if (this.translationSnap) {
                if (space === "local") {
                    object.position.applyQuaternion(
                        this.tempQuaternion.copy(this.quaternionStart).invert()
                    );

                    if (axis.search("X") !== -1) {
                        object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search("Y") !== -1) {
                        object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search("Z") !== -1) {
                        object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                    }

                    object.position.applyQuaternion(this.quaternionStart);
                }

                if (space === "world") {
                    if (object.parent) {
                        object.position.add(
                            this.tempVector.setFromMatrixPosition(object.parent.matrixWorld)
                        );
                    }

                    if (axis.search("X") !== -1) {
                        object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search("Y") !== -1) {
                        object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                    }

                    if (axis.search("Z") !== -1) {
                        object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                    }

                    if (object.parent) {
                        object.position.sub(this.tempVector.setFromMatrixPosition(object.parent.matrixWorld));
                    }

                }

            }

        } else if (mode === "scale") {

            if (axis.search("XYZ") !== -1) {

                let d = this.pointEnd.length() / this.pointStart.length();

                if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;

                this.tempVector.set(d, d, d);

            } else {

                this.tempVector.copy(this.pointEnd).divide(this.pointStart);

                if (axis.search("X") === -1) {
                    this.tempVector.x = 1;
                }
                if (axis.search("Y") === -1) {
                    this.tempVector.y = 1;
                }
                if (axis.search("Z") === -1) {
                    this.tempVector.z = 1;
                }

            }

            // Apply scale

            object.scale.copy(this.scaleStart).multiply(this.tempVector);

        } else if (mode === "rotate") {
            let ROTATION_SPEED = 20 / this.worldPosition.distanceTo(this.tempVector.setFromMatrixPosition(this.camera.matrixWorld));
            let quaternion = this.space === "local" ? this.worldQuaternion : this.identityQuaternion;
            let unit;

            if (axis === "E") {

                this.tempVector.copy(this.pointEnd).cross(this.pointStart);
                this.rotationAxis.copy(this.eye);
                this.rotationAngle = this.pointEnd.angleTo(this.pointStart) * (this.tempVector.dot(this.eye) < 0 ? 1 : -1);

            } else if (axis === "XYZE") {
                this.tempVector.copy(this.pointEnd).sub(this.pointStart).cross(this.eye).normalize();
                this.rotationAxis.copy(this.tempVector);
                this.rotationAngle = this.pointEnd.sub(this.pointStart).dot(this.tempVector.cross(this.eye)) * ROTATION_SPEED;

            } else if (axis === "X" || axis === "Y" || axis === "Z") {
                unit = this.unit[axis];
                
                this.alignVector.copy(unit).applyQuaternion(quaternion);
                this.rotationAxis.copy(unit);

                this.tempVector = unit.clone();
                this.tempVector2 = this.pointEnd.clone().sub(this.pointStart);
                
                if (space === "local") {
                    this.tempVector.applyQuaternion(quaternion);
                    this.tempVector2.applyQuaternion(this.worldQuaternionStart);
                }
                
                this.rotationAngle = this.tempVector2.dot(this.tempVector.cross(this.eye).normalize()) * ROTATION_SPEED;
            }

            // Apply rotation snap

            if (this.rotationSnap) this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap;

            // Apply rotate

            if (space === "local") {

                object.quaternion.copy(this.quaternionStart);
                object.quaternion.multiply(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle));

            } else {

                object.quaternion.copy(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle));
                object.quaternion.multiply(this.quaternionStart);

            }

        }

        this.dispatchEvent(this.changeEvent);
        this.dispatchEvent(this.objectChangeEvent);

    }

    protected pointerUp = (pointer: PointerEvent): void => {
        if (pointer.button !== undefined && pointer.button !== 0) return;

        if (this.dragging && this.axis) {
            this.mouseUpEvent.mode = this.mode;
            this.dispatchEvent(this.mouseUpEvent);
        }

        this.dragging = false;

        if (pointer.button === undefined) this.axis = undefined;
    }
    
    // normalize mouse / touch pointer and remap {x,y} to view space.

	protected getPointer = (event: any): any => {
		let pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;
		let rect = this.domElement.getBoundingClientRect();

		return {
			x: ( pointer.clientX - rect.left ) / rect.width * 2 - 1,
			y: - ( pointer.clientY - rect.top ) / rect.height * 2 + 1,
			button: event.button
		};
	}

	// mouse / touch event handlers

	protected onContext = (event: MouseEvent): void => {
		event.preventDefault();
	}

	protected onPointerHover = (event: MouseEvent | TouchEvent): void => {
		if (!this.enabled) return;

		this.pointerHover(this.getPointer(event));
	}

	protected onPointerDown = (event: MouseEvent | TouchEvent): void => {
        ;
		if (!this.enabled) return;
        ;

		event.preventDefault();
		
		document.addEventListener( "mousemove", this.onPointerMove, false);

		this.pointerHover(this.getPointer(event));
		this.pointerDown(this.getPointer(event));
	}

	protected onPointerMove = (event: MouseEvent | TouchEvent): void => {
		if (!this.enabled) return;

		event.preventDefault();

		this.pointerMove(this.getPointer(event));
	}

	protected onPointerUp = (event: Event): void => {
		if (!this.enabled) return;

		event.preventDefault(); // Prevent MouseEvent on mobile

		document.removeEventListener("mousemove", this.onPointerMove, false);

		this.pointerUp(this.getPointer(event));
	}
}

class TransformControlsGizmo extends THREE.Object3D {
    public controls: TransformControls;
    public gizmo: {
        translate: THREE.Object3D,
        rotate: THREE.Object3D,
        scale: THREE.Object3D,
    };
    public picker: {
        translate: THREE.Object3D,
        rotate: THREE.Object3D,
        scale: THREE.Object3D,
    };
    public helper: {
        translate: THREE.Object3D,
        rotate: THREE.Object3D,
        scale: THREE.Object3D,
    };
    
    constructor(controls: TransformControls) {
        super();
	
        this.controls = controls;
        this.type = "TransformControlsGizmo";

        // shared materials

        const gizmoMaterial = new THREE.MeshBasicMaterial({
            depthTest: false,
            depthWrite: false,
            transparent: true,
            side: THREE.DoubleSide,
            fog: false
        });

        const gizmoLineMaterial = new THREE.LineBasicMaterial({
            depthTest: false,
            depthWrite: false,
            transparent: true,
            linewidth: 1
        });

        // Make unique material for each axis/color

        const matInvisible = gizmoMaterial.clone();
        matInvisible.opacity = 0.15;

        const matHelper = gizmoMaterial.clone();
        matHelper.opacity = 0.33;

        const matRed = gizmoMaterial.clone();
        matRed.color.set(0xff0000);

        const matGreen = gizmoMaterial.clone();
        matGreen.color.set(0x00ff00);

        const matBlue = gizmoMaterial.clone();
        matBlue.color.set(0x0000ff);

        const matWhiteTransperent = gizmoMaterial.clone();
        matWhiteTransperent.opacity = 0.25;

        const matYellowTransparent = matWhiteTransperent.clone();
        matYellowTransparent.color.set(0xffff00);

        const matCyanTransparent = matWhiteTransperent.clone();
        matCyanTransparent.color.set(0x00ffff);

        const matMagentaTransparent = matWhiteTransperent.clone();
        matMagentaTransparent.color.set(0xff00ff);

        const matYellow = gizmoMaterial.clone();
        matYellow.color.set(0xffff00);

        const matLineRed = gizmoLineMaterial.clone();
        matLineRed.color.set(0xff0000);

        const matLineGreen = gizmoLineMaterial.clone();
        matLineGreen.color.set(0x00ff00);

        const matLineBlue = gizmoLineMaterial.clone();
        matLineBlue.color.set(0x0000ff);

        const matLineCyan = gizmoLineMaterial.clone();
        matLineCyan.color.set(0x00ffff);

        const matLineMagenta = gizmoLineMaterial.clone();
        matLineMagenta.color.set(0xff00ff);

        const matLineYellow = gizmoLineMaterial.clone();
        matLineYellow.color.set(0xffff00);

        const matLineGray = gizmoLineMaterial.clone();
        matLineGray.color.set(0x787878);

        const matLineYellowTransparent = matLineYellow.clone();
        matLineYellowTransparent.opacity = 0.25;

        // reusable geometry

        const arrowGeometry = new THREE.CylinderBufferGeometry(0, 0.05, 0.2, 12, 1, false);
        const scaleHandleGeometry = new THREE.BoxBufferGeometry(0.125, 0.125, 0.125);
        const lineGeometry = new THREE.BufferGeometry();
        
        lineGeometry.setAttribute(
            "position", 
            new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3)
        );

        const CircleGeometry = (radius: number, arc: number) => {
            const geometry = new THREE.BufferGeometry();
            const vertices: Array<number> = [];

            for (let i = 0; i <= 64*arc; ++i) {
                vertices.push( 
                    0, 
                    Math.cos(i/32*Math.PI)*radius, 
                    Math.sin(i/32*Math.PI)*radius
                );
            }

            geometry.setAttribute(
                "position", 
                new THREE.Float32BufferAttribute(vertices, 3)
            );

            return geometry;
        }

        /*
         * Special geometry for transform helper. If scaled with position vector 
         * it spans from [0,0,0] to position
         */
        
        const TranslateHelperGeometry = () => {
            const geometry = new THREE.BufferGeometry()

            geometry.setAttribute(
                "position", 
                new THREE.Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
            );

            return geometry;
        }

        // Gizmo definitions - custom hierarchy definitions for setupGizmo() function

        const gizmoTranslate = {
            X: [
                [ 
                    new THREE.Mesh(arrowGeometry, matRed), 
                    [1, 0, 0], 
                    [0, 0, -Math.PI/2], 
                    null, 
                    "fwd" 
                ],
                [ 
                    new THREE.Mesh(arrowGeometry, matRed), 
                    [1, 0, 0], 
                    [0, 0, Math.PI/2], 
                    null, 
                    "bwd"
                ],
                [ new THREE.Line(lineGeometry, matLineRed) ]
            ],
            Y: [
                [ 
                    new THREE.Mesh(arrowGeometry, matGreen), 
                    [0, 1, 0], 
                    null, 
                    null, 
                    "fwd"
                ],
                [ 
                    new THREE.Mesh(arrowGeometry, matGreen), 
                    [0, 1, 0], 
                    [Math.PI, 0, 0], 
                    null, 
                    "bwd"
                ],
                [ 
                    new THREE.Line(lineGeometry, matLineGreen),
                    null, 
                    [0, 0, Math.PI/2] 
                ]
            ],
            Z: [
                [ 
                    new THREE.Mesh(arrowGeometry, matBlue), 
                    [0, 0, 1], 
                    [Math.PI/2, 0, 0], 
                    null, 
                    "fwd" 
                ],
                [ 
                    new THREE.Mesh(arrowGeometry, matBlue), 
                    [0, 0, 1], 
                    [-Math.PI/2, 0, 0], 
                    null, 
                    "bwd"
                ],
                [
                    new THREE.Line(lineGeometry, matLineBlue), 
                    null, 
                    [0, -Math.PI/2, 0] 
                ]
            ],
            XYZ: [
                [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.1, 0 ), matWhiteTransperent ), [ 0, 0, 0 ], [ 0, 0, 0 ] ]
            ],
            XY: [
                [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.295, 0.295 ), matYellowTransparent ), [ 0.15, 0.15, 0 ] ],
                [ new THREE.Line( lineGeometry, matLineYellow ), [ 0.18, 0.3, 0 ], null, [ 0.125, 1, 1 ] ],
                [ new THREE.Line( lineGeometry, matLineYellow ), [ 0.3, 0.18, 0 ], [ 0, 0, Math.PI / 2 ], [ 0.125, 1, 1 ] ]
            ],
            YZ: [
                [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.295, 0.295 ), matCyanTransparent ), [ 0, 0.15, 0.15 ], [ 0, Math.PI / 2, 0 ] ],
                [ new THREE.Line( lineGeometry, matLineCyan ), [ 0, 0.18, 0.3 ], [ 0, 0, Math.PI / 2 ], [ 0.125, 1, 1 ] ],
                [ new THREE.Line( lineGeometry, matLineCyan ), [ 0, 0.3, 0.18 ], [ 0, -Math.PI / 2, 0 ], [ 0.125, 1, 1 ] ]
            ],
            XZ: [
                [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.295, 0.295 ), matMagentaTransparent ), [ 0.15, 0, 0.15 ], [ -Math.PI / 2, 0, 0 ] ],
                [ new THREE.Line( lineGeometry, matLineMagenta ), [ 0.18, 0, 0.3 ], null, [ 0.125, 1, 1 ] ],
                [ new THREE.Line( lineGeometry, matLineMagenta ), [ 0.3, 0, 0.18 ], [ 0, -Math.PI / 2, 0 ], [ 0.125, 1, 1 ] ]
            ]
        };

        const pickerTranslate = {
            X: [
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), matInvisible ), [ 0.6, 0, 0 ], [ 0, 0, -Math.PI / 2 ] ]
            ],
            Y: [
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), matInvisible ), [ 0, 0.6, 0 ] ]
            ],
            Z: [
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), matInvisible ), [ 0, 0, 0.6 ], [ Math.PI / 2, 0, 0 ] ]
            ],
            XYZ: [
                [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.2, 0 ), matInvisible ) ]
            ],
            XY: [
                [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), matInvisible ), [ 0.2, 0.2, 0 ] ]
            ],
            YZ: [
                [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), matInvisible ), [ 0, 0.2, 0.2 ], [ 0, Math.PI / 2, 0 ] ]
            ],
            XZ: [
                [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), matInvisible ), [ 0.2, 0, 0.2 ], [ -Math.PI / 2, 0, 0 ] ]
            ]
        };

        const helperTranslate = {
            START: [
                [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.01, 2 ), matHelper ), null, null, null, "helper" ]
            ],
            END: [
                [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.01, 2 ), matHelper ), null, null, null, "helper" ]
            ],
            DELTA: [
                [ new THREE.Line( TranslateHelperGeometry(), matHelper ), null, null, null, "helper" ]
            ],
            X: [
                [ new THREE.Line( lineGeometry, matHelper.clone() ), [ -1e3, 0, 0 ], null, [ 1e6, 1, 1 ], "helper" ]
            ],
            Y: [
                [ new THREE.Line( lineGeometry, matHelper.clone() ), [ 0, -1e3, 0 ], [ 0, 0, Math.PI / 2 ], [ 1e6, 1, 1 ], "helper" ]
            ],
            Z: [
                [ new THREE.Line( lineGeometry, matHelper.clone() ), [ 0, 0, -1e3 ], [ 0, -Math.PI / 2, 0 ], [ 1e6, 1, 1 ], "helper" ]
            ]
        };

        const gizmoRotate = {
            X: [
                [ new THREE.Line( CircleGeometry( 1, 0.5 ), matLineRed ) ],
                [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.04, 0 ), matRed ), [ 0, 0, 0.99 ], null, [ 1, 3, 1 ] ],
            ],
            Y: [
                [ new THREE.Line( CircleGeometry( 1, 0.5 ), matLineGreen ), null, [ 0, 0, -Math.PI / 2 ] ],
                [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.04, 0 ), matGreen ), [ 0, 0, 0.99 ], null, [ 3, 1, 1 ] ],
            ],
            Z: [
                [ new THREE.Line( CircleGeometry( 1, 0.5 ), matLineBlue ), null, [ 0, Math.PI / 2, 0 ] ],
                [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.04, 0 ), matBlue ), [ 0.99, 0, 0 ], null, [ 1, 3, 1 ] ],
            ],
            E: [
                [ new THREE.Line( CircleGeometry( 1.25, 1 ), matLineYellowTransparent ), null, [ 0, Math.PI / 2, 0 ] ],
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.03, 0, 0.15, 4, 1, false ), matLineYellowTransparent ), [ 1.17, 0, 0 ], [ 0, 0, -Math.PI / 2 ], [ 1, 1, 0.001 ]],
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.03, 0, 0.15, 4, 1, false ), matLineYellowTransparent ), [ -1.17, 0, 0 ], [ 0, 0, Math.PI / 2 ], [ 1, 1, 0.001 ]],
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.03, 0, 0.15, 4, 1, false ), matLineYellowTransparent ), [ 0, -1.17, 0 ], [ Math.PI, 0, 0 ], [ 1, 1, 0.001 ]],
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.03, 0, 0.15, 4, 1, false ), matLineYellowTransparent ), [ 0, 1.17, 0 ], [ 0, 0, 0 ], [ 1, 1, 0.001 ]],
            ],
            XYZE: [
                [ new THREE.Line( CircleGeometry( 1, 1 ), matLineGray ), null, [ 0, Math.PI / 2, 0 ] ]
            ]
        };

        const helperRotate = {
            AXIS: [
                [ new THREE.Line( lineGeometry, matHelper.clone() ), [ -1e3, 0, 0 ], null, [ 1e6, 1, 1 ], "helper" ]
            ]
        };

        const pickerRotate = {
            X: [
                [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.1, 4, 24 ), matInvisible ), [ 0, 0, 0 ], [ 0, -Math.PI / 2, -Math.PI / 2 ] ],
            ],
            Y: [
                [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.1, 4, 24 ), matInvisible ), [ 0, 0, 0 ], [ Math.PI / 2, 0, 0 ] ],
            ],
            Z: [
                [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.1, 4, 24 ), matInvisible ), [ 0, 0, 0 ], [ 0, 0, -Math.PI / 2 ] ],
            ],
            E: [
                [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1.25, 0.1, 2, 24 ), matInvisible ) ]
            ],
            XYZE: [
                [ new THREE.Mesh( new THREE.SphereBufferGeometry( 0.7, 10, 8 ), matInvisible ) ]
            ]
        };

        const gizmoScale = {
            X: [
                [ new THREE.Mesh( scaleHandleGeometry, matRed ), [ 0.8, 0, 0 ], [ 0, 0, -Math.PI / 2 ] ],
                [ new THREE.Line( lineGeometry, matLineRed ), null, null, [ 0.8, 1, 1 ] ]
            ],
            Y: [
                [ new THREE.Mesh( scaleHandleGeometry, matGreen ), [ 0, 0.8, 0 ] ],
                [ new THREE.Line( lineGeometry, matLineGreen ), null, [ 0, 0, Math.PI / 2 ], [ 0.8, 1, 1 ] ]
            ],
            Z: [
                [ new THREE.Mesh( scaleHandleGeometry, matBlue ), [ 0, 0, 0.8 ], [ Math.PI / 2, 0, 0 ] ],
                [ new THREE.Line( lineGeometry, matLineBlue ), null, [ 0, -Math.PI / 2, 0 ], [ 0.8, 1, 1 ] ]
            ],
            XY: [
                [ new THREE.Mesh( scaleHandleGeometry, matYellowTransparent ), [ 0.85, 0.85, 0 ], null, [ 2, 2, 0.2 ] ],
                [ new THREE.Line( lineGeometry, matLineYellow ), [ 0.855, 0.98, 0 ], null, [ 0.125, 1, 1 ] ],
                [ new THREE.Line( lineGeometry, matLineYellow ), [ 0.98, 0.855, 0 ], [ 0, 0, Math.PI / 2 ], [ 0.125, 1, 1 ] ]
            ],
            YZ: [
                [ new THREE.Mesh( scaleHandleGeometry, matCyanTransparent ), [ 0, 0.85, 0.85 ], null, [ 0.2, 2, 2 ] ],
                [ new THREE.Line( lineGeometry, matLineCyan ), [ 0, 0.855, 0.98 ], [ 0, 0, Math.PI / 2 ], [ 0.125, 1, 1 ] ],
                [ new THREE.Line( lineGeometry, matLineCyan ), [ 0, 0.98, 0.855 ], [ 0, -Math.PI / 2, 0 ], [ 0.125, 1, 1 ] ]
            ],
            XZ: [
                [ new THREE.Mesh( scaleHandleGeometry, matMagentaTransparent ), [ 0.85, 0, 0.85 ], null, [ 2, 0.2, 2 ] ],
                [ new THREE.Line( lineGeometry, matLineMagenta ), [ 0.855, 0, 0.98 ], null, [ 0.125, 1, 1 ] ],
                [ new THREE.Line( lineGeometry, matLineMagenta ), [ 0.98, 0, 0.855 ], [ 0, -Math.PI / 2, 0 ], [ 0.125, 1, 1 ] ]
            ],
            XYZX: [
                [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.125, 0.125, 0.125 ), matWhiteTransperent ), [ 1.1, 0, 0 ] ],
            ],
            XYZY: [
                [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.125, 0.125, 0.125 ), matWhiteTransperent ), [ 0, 1.1, 0 ] ],
            ],
            XYZZ: [
                [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.125, 0.125, 0.125 ), matWhiteTransperent ), [ 0, 0, 1.1 ] ],
            ]
        };

        const pickerScale = {
            X: [
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 0.8, 4, 1, false ), matInvisible ), [ 0.5, 0, 0 ], [ 0, 0, -Math.PI / 2 ] ]
            ],
            Y: [
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 0.8, 4, 1, false ), matInvisible ), [ 0, 0.5, 0 ] ]
            ],
            Z: [
                [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 0.8, 4, 1, false ), matInvisible ), [ 0, 0, 0.5 ], [ Math.PI / 2, 0, 0 ] ]
            ],
            XY: [
                [ new THREE.Mesh( scaleHandleGeometry, matInvisible ), [ 0.85, 0.85, 0 ], null, [ 3, 3, 0.2 ] ],
            ],
            YZ: [
                [ new THREE.Mesh( scaleHandleGeometry, matInvisible ), [ 0, 0.85, 0.85 ], null, [ 0.2, 3, 3 ] ],
            ],
            XZ: [
                [ new THREE.Mesh( scaleHandleGeometry, matInvisible ), [ 0.85, 0, 0.85 ], null, [ 3, 0.2, 3 ] ],
            ],
            XYZX: [
                [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 ), matInvisible ), [ 1.1, 0, 0 ] ],
            ],
            XYZY: [
                [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 ), matInvisible ), [ 0, 1.1, 0 ] ],
            ],
            XYZZ: [
                [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 ), matInvisible ), [ 0, 0, 1.1 ] ],
            ]
        };

        const helperScale = {
            X: [
                [ new THREE.Line( lineGeometry, matHelper.clone() ), [ -1e3, 0, 0 ], null, [ 1e6, 1, 1 ], "helper" ]
            ],
            Y: [
                [ new THREE.Line( lineGeometry, matHelper.clone() ), [ 0, -1e3, 0 ], [ 0, 0, Math.PI / 2 ], [ 1e6, 1, 1 ], "helper" ]
            ],
            Z: [
                [ new THREE.Line( lineGeometry, matHelper.clone() ), [ 0, 0, -1e3 ], [ 0, -Math.PI / 2, 0 ], [ 1e6, 1, 1 ], "helper" ]
            ]
        };

        // Creates an Object3D with gizmos described in custom hierarchy definition.

        const setupGizmo = (
            gizmoMap: {
                [key: string]: Array<any>
            }
        ) => {
            const gizmo = new THREE.Object3D();

            for (const name in gizmoMap) {
                for (let i = gizmoMap[name].length; i--;) {
                    const object = gizmoMap[name][i][0].clone();
                    const position = gizmoMap[name][i][1];
                    const rotation = gizmoMap[name][i][2];
                    const scale = gizmoMap[name][i][3];
                    const tag = gizmoMap[name][i][4];

                    // name and tag properties are essential for picking and updating logic.
                    object.name = name;
                    object.tag = tag;

                    if (position) {
                        object.position.set(position[0], position[1], position[2]);
                    }
                    if (rotation) {
                        object.rotation.set(rotation[0], rotation[1], rotation[2]);
                    }
                    if (scale) {
                        object.scale.set(scale[0], scale[1], scale[2]);
                    }

                    object.updateMatrix();

                    const tempGeometry = object.geometry.clone();
                    tempGeometry.applyMatrix4(object.matrix);
                    object.geometry = tempGeometry;

                    object.position.set(0, 0, 0);
                    object.rotation.set(0, 0, 0);
                    object.scale.set(1, 1, 1);

                    gizmo.add(object);
                }
            }

            return gizmo;
        }

        // Reusable utility variables

        const tempVector = new THREE.Vector3( 0, 0, 0 );
        const tempEuler = new THREE.Euler();
        const alignVector = new THREE.Vector3( 0, 1, 0 );
        const zeroVector = new THREE.Vector3( 0, 0, 0 );
        const lookAtMatrix = new THREE.Matrix4();
        const tempQuaternion = new THREE.Quaternion();
        const tempQuaternion2 = new THREE.Quaternion();
        const identityQuaternion = new THREE.Quaternion();

        const unitX = new THREE.Vector3( 1, 0, 0 );
        const unitY = new THREE.Vector3( 0, 1, 0 );
        const unitZ = new THREE.Vector3( 0, 0, 1 );

        // Gizmo creation

        this.gizmo = {
            translate: setupGizmo(gizmoTranslate),
            rotate: setupGizmo(gizmoRotate),
            scale: setupGizmo(gizmoScale)
        }
        
        this.picker = {
            translate: setupGizmo(pickerTranslate),
            rotate: setupGizmo(pickerRotate),
            scale: setupGizmo(pickerScale)
        }
        
        this.helper = {
            translate: setupGizmo(helperTranslate),
            rotate: setupGizmo(helperRotate),
            scale: setupGizmo(helperScale)
        }
        
        this.add(this.gizmo["translate"]);
        this.add(this.gizmo["rotate"]);
        this.add(this.gizmo["scale"]);
        this.add(this.picker["translate"]);
        this.add(this.picker["rotate"]);
        this.add(this.picker["scale"]);
        this.add(this.helper["translate"]);
        this.add(this.helper["rotate"]);
        this.add(this.helper["scale"]);

        // Pickers should be hidden always

        this.picker["translate"].visible = false;
        this.picker["rotate"].visible = false;
        this.picker["scale"].visible = false;

        // updateMatrixWorld will update transformations and appearance of individual handles

        this.updateMatrixWorld = () => {
            let space = this.controls.space;

            if ( this.controls.mode ==="scale") space = "local"; // scale always oriented to local rotation

            const quaternion = space === "local" ? this.controls.worldQuaternion : identityQuaternion;

            // Show only gizmos for current transform mode

            this.gizmo["translate"].visible = this.controls.mode === "translate";
            this.gizmo["rotate"].visible = this.controls.mode === "rotate";
            this.gizmo["scale"].visible = this.controls.mode === "scale";

            this.helper["translate"].visible = this.controls.mode === "translate";
            this.helper["rotate"].visible = this.controls.mode === "rotate";
            this.helper["scale"].visible = this.controls.mode === "scale";


            let handles: Array<any> = [];
            handles = handles.concat( this.picker[ this.controls.mode ].children );
            handles = handles.concat( this.gizmo[ this.controls.mode ].children );
            handles = handles.concat( this.helper[ this.controls.mode ].children );

            for ( let i = 0; i < handles.length; i++ ) {

                const handle = handles[i];

                // hide aligned to camera

                handle.visible = true;
                handle.rotation.set( 0, 0, 0 );
                handle.position.copy( this.controls.worldPosition );

                const eyeDistance = this.controls.worldPosition.distanceTo( this.controls.cameraPosition);
                handle.scale.set( 1, 1, 1 ).multiplyScalar( eyeDistance * this.controls.size / 7 );

                // TODO: simplify helpers and consider decoupling from gizmo

                if ( handle.tag === "helper" ) {

                    handle.visible = false;

                    if ( handle.name === "AXIS" ) {

                        handle.position.copy( this.controls.worldPositionStart );
                        handle.visible = !!this.controls.axis;

                        if ( this.controls.axis === "X" ) {

                            tempQuaternion.setFromEuler( tempEuler.set( 0, 0, 0 ) );
                            handle.quaternion.copy( quaternion ).multiply( tempQuaternion );

                            if ( Math.abs( alignVector.copy( unitX ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) > 0.9 ) {
                                handle.visible = false;
                            }

                        }

                        if ( this.controls.axis === "Y" ) {

                            tempQuaternion.setFromEuler( tempEuler.set( 0, 0, Math.PI / 2 ) );
                            handle.quaternion.copy( quaternion ).multiply( tempQuaternion );

                            if ( Math.abs( alignVector.copy( unitY ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) > 0.9 ) {
                                handle.visible = false;
                            }

                        }

                        if ( this.controls.axis === "Z" ) {

                            tempQuaternion.setFromEuler( tempEuler.set( 0, Math.PI / 2, 0 ) );
                            handle.quaternion.copy( quaternion ).multiply( tempQuaternion );

                            if ( Math.abs( alignVector.copy( unitZ ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) > 0.9 ) {
                                handle.visible = false;
                            }

                        }

                        if ( this.controls.axis === "XYZE" ) {

                            tempQuaternion.setFromEuler( tempEuler.set( 0, Math.PI / 2, 0 ) );
                            alignVector.copy( this.controls.rotationAxis );
                            handle.quaternion.setFromRotationMatrix( lookAtMatrix.lookAt( zeroVector, alignVector, unitY ) );
                            handle.quaternion.multiply( tempQuaternion );
                            handle.visible = this.controls.dragging;

                        }

                        if ( this.controls.axis === "E" ) {

                            handle.visible = false;

                        }


                    } else if ( handle.name === "START" ) {

                        handle.position.copy( this.controls.worldPositionStart );
                        handle.visible = this.controls.dragging;

                    } else if ( handle.name === "END" ) {

                        handle.position.copy( this.controls.worldPosition );
                        handle.visible = this.controls.dragging;

                    } else if ( handle.name === "DELTA" ) {

                        handle.position.copy( this.controls.worldPositionStart );
                        handle.quaternion.copy( this.controls.worldQuaternionStart );
                        tempVector.set( 1e-10, 1e-10, 1e-10 ).add( this.controls.worldPositionStart ).sub( this.controls.worldPosition ).multiplyScalar( -1 );
                        tempVector.applyQuaternion( this.controls.worldQuaternionStart.clone().invert() );
                        handle.scale.copy( tempVector );
                        handle.visible = this.controls.dragging;

                    } else {

                        handle.quaternion.copy( quaternion );

                        if ( this.controls.dragging ) {

                            handle.position.copy( this.controls.worldPositionStart );

                        } else {

                            handle.position.copy( this.controls.worldPosition );

                        }

                        if ( this.controls.axis ) {

                            handle.visible = this.controls.axis.search( handle.name ) !== -1;

                        }

                    }

                    // If updating helper, skip rest of the loop
                    continue;

                }

                // Align handles to current local or world rotation

                handle.quaternion.copy( quaternion );

                if ( this.controls.mode ==="translate"|| this.controls.mode ==="scale") {

                    // Hide translate and scale axis facing the camera

                    const AXIS_HIDE_TRESHOLD = 0.99;
                    const PLANE_HIDE_TRESHOLD = 0.2;
                    const AXIS_FLIP_TRESHOLD = -0.4;


                    if ( handle.name === "X" || handle.name === "XYZX" ) {
                        if ( Math.abs( alignVector.copy( unitX ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) > AXIS_HIDE_TRESHOLD ) {
                            handle.scale.set( 1e-10, 1e-10, 1e-10 );
                            handle.visible = false;
                        }
                    }
                    if ( handle.name === "Y" || handle.name === "XYZY" ) {
                        if ( Math.abs( alignVector.copy( unitY ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) > AXIS_HIDE_TRESHOLD ) {
                            handle.scale.set( 1e-10, 1e-10, 1e-10 );
                            handle.visible = false;
                        }
                    }
                    if ( handle.name === "Z" || handle.name === "XYZZ" ) {
                        if ( Math.abs( alignVector.copy( unitZ ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) > AXIS_HIDE_TRESHOLD ) {
                            handle.scale.set( 1e-10, 1e-10, 1e-10 );
                            handle.visible = false;
                        }
                    }
                    if ( handle.name === "XY" ) {
                        if ( Math.abs( alignVector.copy( unitZ ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) < PLANE_HIDE_TRESHOLD ) {
                            handle.scale.set( 1e-10, 1e-10, 1e-10 );
                            handle.visible = false;
                        }
                    }
                    if ( handle.name === "YZ" ) {
                        if ( Math.abs( alignVector.copy( unitX ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) < PLANE_HIDE_TRESHOLD ) {
                            handle.scale.set( 1e-10, 1e-10, 1e-10 );
                            handle.visible = false;
                        }
                    }
                    if ( handle.name === "XZ" ) {
                        if ( Math.abs( alignVector.copy( unitY ).applyQuaternion( quaternion ).dot( this.controls.eye ) ) < PLANE_HIDE_TRESHOLD ) {
                            handle.scale.set( 1e-10, 1e-10, 1e-10 );
                            handle.visible = false;
                        }
                    }

                    // Flip translate and scale axis ocluded behind another axis

                    if ( handle.name.search( "X" ) !== -1 ) {
                        if ( alignVector.copy( unitX ).applyQuaternion( quaternion ).dot( this.controls.eye ) < AXIS_FLIP_TRESHOLD ) {
                            if ( handle.tag === "fwd" ) {
                                handle.visible = false;
                            } else {
                                handle.scale.x *= -1;
                            }
                        } else if ( handle.tag === "bwd" ) {
                            handle.visible = false;
                        }
                    }

                    if ( handle.name.search( "Y" ) !== -1 ) {
                        if ( alignVector.copy( unitY ).applyQuaternion( quaternion ).dot( this.controls.eye ) < AXIS_FLIP_TRESHOLD ) {
                            if ( handle.tag === "fwd" ) {
                                handle.visible = false;
                            } else {
                                handle.scale.y *= -1;
                            }
                        } else if ( handle.tag === "bwd" ) {
                            handle.visible = false;
                        }
                    }

                    if ( handle.name.search( "Z" ) !== -1 ) {
                        if ( alignVector.copy( unitZ ).applyQuaternion( quaternion ).dot( this.controls.eye ) < AXIS_FLIP_TRESHOLD ) {
                            if ( handle.tag === "fwd" ) {
                                handle.visible = false;
                            } else {
                                handle.scale.z *= -1;
                            }
                        } else if ( handle.tag === "bwd" ) {
                            handle.visible = false;
                        }
                    }

                } else if ( this.controls.mode ==="rotate") {

                    // Align handles to current local or world rotation

                    tempQuaternion2.copy( quaternion );
                    alignVector.copy( this.controls.eye ).applyQuaternion( tempQuaternion.copy( quaternion ).invert() );

                    if ( handle.name.search( "E" ) !== - 1 ) {

                        handle.quaternion.setFromRotationMatrix( lookAtMatrix.lookAt( this.controls.eye, zeroVector, unitY ) );

                    }

                    if ( handle.name === "X" ) {

                        tempQuaternion.setFromAxisAngle( unitX, Math.atan2( -alignVector.y, alignVector.z ) );
                        tempQuaternion.multiplyQuaternions( tempQuaternion2, tempQuaternion );
                        handle.quaternion.copy( tempQuaternion );

                    }

                    if ( handle.name === "Y" ) {

                        tempQuaternion.setFromAxisAngle( unitY, Math.atan2( alignVector.x, alignVector.z ) );
                        tempQuaternion.multiplyQuaternions( tempQuaternion2, tempQuaternion );
                        handle.quaternion.copy( tempQuaternion );

                    }

                    if ( handle.name === "Z" ) {

                        tempQuaternion.setFromAxisAngle( unitZ, Math.atan2( alignVector.y, alignVector.x ) );
                        tempQuaternion.multiplyQuaternions( tempQuaternion2, tempQuaternion );
                        handle.quaternion.copy( tempQuaternion );

                    }

                }

                // Hide disabled axes
                handle.visible = handle.visible && ( handle.name.indexOf( "X" ) === -1 || this.controls.showX );
                handle.visible = handle.visible && ( handle.name.indexOf( "Y" ) === -1 || this.controls.showY );
                handle.visible = handle.visible && ( handle.name.indexOf( "Z" ) === -1 || this.controls.showZ );
                handle.visible = handle.visible && ( handle.name.indexOf( "E" ) === -1 || ( this.controls.showX && this.controls.showY && this.controls.showZ ) );

                // highlight selected axis

                handle.material._opacity = handle.material._opacity || handle.material.opacity;
                handle.material._color = handle.material._color || handle.material.color.clone();

                handle.material.color.copy( handle.material._color );
                handle.material.opacity = handle.material._opacity;

                if ( !this.controls.enabled ) {

                    handle.material.opacity *= 0.5;
                    handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), 0.5 );

                } else if ( this.controls.axis ) {

                    if ( handle.name === this.controls.axis ) {

                        handle.material.opacity = 1.0;
                        handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), 0.5 );

                    } else if ( this.controls.axis.split("").some( function( a ) { return handle.name === a; } ) ) {

                        handle.material.opacity = 1.0;
                        handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), 0.5 );

                    } else {

                        handle.material.opacity *= 0.25;
                        handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), 0.5 );

                    }

                }

            }

            THREE.Object3D.prototype.updateMatrixWorld.call( this );

        };
    }
    
    public updateMatrixWorld: (force?: boolean | undefined) => void;
}

class TransformControlsPlane extends THREE.Mesh {
    protected controls: TransformControls;
    protected unitX: THREE.Vector3;
    protected unitY: THREE.Vector3;
    protected unitZ: THREE.Vector3;

    protected tempVector: THREE.Vector3;
    protected dirVector: THREE.Vector3;
    protected alignVector: THREE.Vector3;
    protected tempMatrix: THREE.Matrix4;
    protected identityQuaternion: THREE.Quaternion;
        
    constructor(controls: TransformControls) {
        super(
            new THREE.PlaneBufferGeometry(100000, 100000, 2, 2),
		    new THREE.MeshBasicMaterial({ 
                visible: false,
                wireframe: true, 
                side: THREE.DoubleSide, 
                transparent: true, 
                opacity: 0.1 
            })
        );
        
        this.controls = controls;
        this.type = "TransformControlsPlane";
        
        this.unitX = new THREE.Vector3( 1, 0, 0 );
        this.unitY = new THREE.Vector3( 0, 1, 0 );
        this.unitZ = new THREE.Vector3( 0, 0, 1 );

        this.tempVector = new THREE.Vector3();
        this.dirVector = new THREE.Vector3();
        this.alignVector = new THREE.Vector3();
        this.tempMatrix = new THREE.Matrix4();
        this.identityQuaternion = new THREE.Quaternion();
    }

	public updateMatrixWorld = (): void => {
		let space = this.controls.space;

		this.position.copy(this.controls.worldPosition);

		if (this.controls.mode === "scale") {
            space = "local"; // scale always oriented to local rotation
        }
        
	    this.unitX.set(1, 0, 0).applyQuaternion(
            space === "local" ? this.controls.worldQuaternion : this.identityQuaternion 
        );
		this.unitY.set(0, 1, 0).applyQuaternion( 
            space === "local" ? this.controls.worldQuaternion : this.identityQuaternion 
        );
		this.unitZ.set(0, 0, 1).applyQuaternion( 
            space === "local" ? this.controls.worldQuaternion : this.identityQuaternion 
        );

		// Align the plane for current transform mode, axis and space.

		this.alignVector.copy(this.unitY);

		switch (this.controls.mode) {
			case "translate":
			case "scale":
				switch (this.controls.axis) {
					case "X":
						this.alignVector.copy( this.controls.eye ).cross(this.unitX );
						this.dirVector.copy(this.unitX ).cross( this.alignVector );
						break;
					case "Y":
						this.alignVector.copy( this.controls.eye ).cross( this.unitY );
						this.dirVector.copy( this.unitY ).cross( this.alignVector );
						break;
					case "Z":
						this.alignVector.copy( this.controls.eye ).cross( this.unitZ );
						this.dirVector.copy( this.unitZ ).cross( this.alignVector );
						break;
					case "XY":
						this.dirVector.copy( this.unitZ );
						break;
					case "YZ":
						this.dirVector.copy(this.unitX );
						break;
					case "XZ":
						this.alignVector.copy( this.unitZ );
						this.dirVector.copy( this.unitY );
						break;
					case "XYZ":
					case "E":
						this.dirVector.set( 0, 0, 0 );
						break;
				}
				break;
			case "rotate":
			default:
				// special case for rotate
				this.dirVector.set( 0, 0, 0 );
		}

		if ( this.dirVector.length() === 0 ) {

			// If in rotate mode, make the plane parallel to camera
			this.quaternion.copy( this.controls.cameraQuaternion );

		} else {

			this.tempMatrix.lookAt( this.tempVector.set( 0, 0, 0 ), this.dirVector, this.alignVector );

			this.quaternion.setFromRotationMatrix( this.tempMatrix );

		}

		THREE.Object3D.prototype.updateMatrixWorld.call( this );

	}
}

export default TransformControls;
export { TransformControlsGizmo, TransformControlsPlane };