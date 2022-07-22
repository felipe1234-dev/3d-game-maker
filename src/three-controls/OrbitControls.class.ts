import * as THREE from "three";

class OrbitControls extends THREE.EventDispatcher {
    public camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    public domElement: HTMLElement;
    public readonly isOrbitControls: true;
    public enabled: boolean;
    public target: THREE.Vector3;
    public minDistance: number;
    public maxDistance: number;
    public minZoom: number;
    public maxZoom: number;
    public minPolarAngle: number;
    public maxPolarAngle: number;

    public minAzimuthAngle: number;
    public maxAzimuthAngle: number;

    public enableDamping: boolean;
    public dampingFactor: number;

    public enableZoom: boolean;
    public zoomSpeed: number;

    public enableRotate: boolean;
    public rotateSpeed: number;

    public enablePan: boolean;
    public panSpeed: number;
    public screenSpacePanning: boolean;
    public keyPanSpeed: number;

    public autoRotate: boolean;
    public autoRotateSpeed: number;

    public enableKeys: boolean;
    public keys: {
        LEFT: number,
        UP: number,
        RIGHT: number,
        BOTTOM: number
    };

    public mouseButtons: {
        LEFT: THREE.MOUSE.LEFT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.RIGHT
    };

    public target0: THREE.Vector3;
    public position0: THREE.Vector3;
    public zoom0: number;

    protected readonly changeEvent: { type: "change" };
    protected readonly startEvent: { type: "start" };
    protected readonly endEvent: { type: "end" };

    protected readonly STATE: {
        NONE: - 1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY_PAN: 4
    };

    protected state: number;

    protected readonly EPS: number;

    protected spherical: THREE.Spherical;
    protected sphericalDelta: THREE.Spherical;

    protected scale: number;
    protected panOffset: THREE.Vector3;
    protected zoomChanged: boolean;

    protected rotateStart: THREE.Vector2;
    protected rotateEnd: THREE.Vector2;
    protected rotateDelta: THREE.Vector2;

    protected panStart: THREE.Vector2;
    protected panEnd: THREE.Vector2;
    protected panDelta: THREE.Vector2;

    protected dollyStart: THREE.Vector2;
    protected dollyEnd: THREE.Vector2;
    protected dollyDelta: THREE.Vector2;

    constructor(
        camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
        domElement: HTMLElement
    ) {
        super();

        this.camera = camera;
        this.domElement = domElement;
        this.isOrbitControls = true;

        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the object orbits around
        this.target = new THREE.Vector3();

        // How far you can dolly in and out (PerspectiveCamera only)
        this.minDistance = 0;
        this.maxDistance = Infinity;

        // How far you can zoom in and out (OrthographicCamera only)
        this.minZoom = 0;
        this.maxZoom = Infinity;

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.25;

        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;

        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = false; // if true, pan in screen-space
        this.keyPanSpeed = 7.0; // pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

        // Set to false to disable use of the keys
        this.enableKeys = true;

        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

        // Mouse buttons
        this.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT };

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.camera.position.clone();
        this.zoom0 = this.camera.zoom;

        this.changeEvent = { type: "change" };
        this.startEvent = { type: "start" };
        this.endEvent = { type: "end" };

        this.STATE = {
            NONE: - 1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_DOLLY_PAN: 4
        };

        this.state = this.STATE.NONE;

        this.EPS = 0.000001;

        // current position in spherical coordinates
        this.spherical = new THREE.Spherical();
        this.sphericalDelta = new THREE.Spherical();

        this.scale = 1;
        this.panOffset = new THREE.Vector3();
        this.zoomChanged = false;

        this.rotateStart = new THREE.Vector2();
        this.rotateEnd = new THREE.Vector2();
        this.rotateDelta = new THREE.Vector2();

        this.panStart = new THREE.Vector2();
        this.panEnd = new THREE.Vector2();
        this.panDelta = new THREE.Vector2();

        this.dollyStart = new THREE.Vector2();
        this.dollyEnd = new THREE.Vector2();
        this.dollyDelta = new THREE.Vector2();

        this.update = (() => {
            let offset = new THREE.Vector3();
            // so camera.up is the orbit axis
            let quat = new THREE.Quaternion()
                .setFromUnitVectors(
                    this.camera.up,
                    new THREE.Vector3(0, 1, 0)
                );
            let quatInverse = quat.clone().invert();
            
            let lastPosition = new THREE.Vector3();
            let lastQuaternion = new THREE.Quaternion();

            const update = () => {
                let position = this.camera.position;

                offset.copy(position).sub(this.target);
                // rotate offset to "y-axis-is-up" space
                offset.applyQuaternion(quat);

                // angle from z-axis around y-axis
                this.spherical.setFromVector3(offset);

                if (this.autoRotate && this.state === this.STATE.NONE) {
                    this.rotateLeft(this.autoRotationAngle);
                }

                this.spherical.theta += this.sphericalDelta.theta;
                this.spherical.phi += this.sphericalDelta.phi;

                // restrict theta to be between desired limits
                this.spherical.theta = Math.max(
                    this.minAzimuthAngle,
                    Math.min(this.maxAzimuthAngle, this.spherical.theta)
                );

                // restrict phi to be between desired limits
                this.spherical.phi = Math.max(
                    this.minPolarAngle,
                    Math.min(this.maxPolarAngle, this.spherical.phi)
                );

                this.spherical.makeSafe();

                this.spherical.radius *= this.scale;

                // restrict radius to be between desired limits
                this.spherical.radius = Math.max(
                    this.minDistance,
                    Math.min(this.maxDistance, this.spherical.radius)
                );

                // move target to panned location
                this.target.add(this.panOffset);

                offset.setFromSpherical(this.spherical);

                // rotate offset back to "camera-up-vector-is-up" space
                offset.applyQuaternion(quatInverse);

                position.copy(this.target).add(offset);

                this.camera.lookAt(this.target);

                if (this.enableDamping) {
                    this.sphericalDelta.theta *= (1 - this.dampingFactor);
                    this.sphericalDelta.phi *= (1 - this.dampingFactor);

                    this.panOffset.multiplyScalar(1 - this.dampingFactor);
                } else {
                    this.sphericalDelta.set(0, 0, 0);
                    this.panOffset.set(0, 0, 0);
                }

                this.scale = 1;

                // update condition is:
                // min(camera displacement, camera rotation in radians)^2 > EPS
                // using small-angle approximation cos(x/2) = 1 - x^2 / 8

                if (
                    this.zoomChanged ||
                    lastPosition.distanceToSquared(this.camera.position) > this.EPS ||
                    8 * (1 - lastQuaternion.dot(this.camera.quaternion)) > this.EPS
                ) {
                    this.dispatchEvent(this.changeEvent);

                    lastPosition.copy(this.camera.position);
                    lastQuaternion.copy(this.camera.quaternion);
                    this.zoomChanged = false;

                    return true;
                }

                return false;
            }

            return update;
        })();

        this.panLeft = (() => {
            const v = new THREE.Vector3();

            const panLeft = (distance: number, objectMatrix: THREE.Matrix4) => {
                v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
                v.multiplyScalar(-distance);

                this.panOffset.add(v);
            }

            return panLeft;
        })();

        this.panUp = (() => {
            const v = new THREE.Vector3();

            const panUp = (distance: number, objectMatrix: THREE.Matrix4) => {
                if (this.screenSpacePanning) {
                    v.setFromMatrixColumn(objectMatrix, 1);
                } else {
                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.crossVectors(this.camera.up, v);
                }

                v.multiplyScalar(distance);
                this.panOffset.add(v);
            }

            return panUp;
        })();

        // deltaX and deltaY are in pixels; right and down are positive
        this.pan = (() => {
            const offset = new THREE.Vector3();

            const pan = (deltaX: number, deltaY: number) => {
                const element = this.domElement;

                if (this.camera instanceof THREE.PerspectiveCamera) {
                    // perspective
                    const position = this.camera.position;
                    offset.copy(position).sub(this.target);
                    let targetDistance = offset.length();

                    // half of the fov is center to top of screen
                    targetDistance *= Math.tan(
                        (this.camera.fov / 2) * Math.PI / 180.0
                    );

                    // we use only clientHeight here so aspect ratio does not distort speed
                    this.panLeft(
                        2 * deltaX * targetDistance / element.clientHeight,
                        this.camera.matrix
                    );
                    this.panUp(
                        2 * deltaY * targetDistance / element.clientHeight,
                        this.camera.matrix
                    );
                } else if (this.camera instanceof THREE.OrthographicCamera) {
                    // orthographic
                    this.panLeft(
                        deltaX * (this.camera.right - this.camera.left) / this.camera.zoom / element.clientWidth,
                        this.camera.matrix
                    );
                    this.panUp(
                        deltaY * (this.camera.top - this.camera.bottom) / this.camera.zoom / element.clientHeight,
                        this.camera.matrix
                    );
                } else {
                    // camera neither orthographic nor perspective
                    console.warn(
                        "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
                    );
                    this.enablePan = false;
                }
            };

            return pan;
        })();

        this.domElement.addEventListener("contextmenu", this.onContextMenu, false);

        this.domElement.addEventListener("mousedown", this.onMouseDown, false);
        this.domElement.addEventListener("wheel", this.onMouseWheel, false);

        this.domElement.addEventListener("touchstart", this.onTouchStart, false);
        this.domElement.addEventListener("touchend", this.onTouchEnd, false);
        this.domElement.addEventListener("touchmove", this.onTouchMove, false);

        window.addEventListener("keydown", this.onKeyDown, false);

        this.update();
    }

    public update: () => boolean;

    public panLeft: (distance: number, objectMatrix: THREE.Matrix4) => void;
    public panUp: (distance: number, objectMatrix: THREE.Matrix4) => void;
    public pan: (deltaX: number, deltaY: number) => void;

    public get polarAngle(): number {
        return this.spherical.phi;
    }

    public get azimuthalAngle(): number {
        return this.spherical.theta;
    }

    public get autoRotationAngle(): number {
        return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
    }

    public get zoomScale(): number {
        return Math.pow(0.95, this.zoomSpeed);
    }

    public saveState(): void {
        this.target0.copy(this.target);
        this.position0.copy(this.camera.position);
        this.zoom0 = this.camera.zoom;
    }

    public reset(): void {
        this.target.copy(this.target0);

        this.camera.position.copy(this.position0);
        this.camera.zoom = this.zoom0;
        this.camera.updateProjectionMatrix();

        this.dispatchEvent(this.changeEvent);
        this.update();
        this.state = this.STATE.NONE;
    }

    public rotateLeft(angle: number): void {
        this.sphericalDelta.theta -= angle;
    }

    public rotateUp(angle: number): void {
        this.sphericalDelta.phi -= angle;
    }

    protected dollyIn(dollyScale: number): void {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.scale /= dollyScale;
        } else if (this.camera instanceof THREE.OrthographicCamera) {
            this.camera.zoom = Math.max(
                this.minZoom,
                Math.min(
                    this.maxZoom,
                    this.camera.zoom * dollyScale
                )
            );
            this.camera.updateProjectionMatrix();
            this.zoomChanged = true;
        } else {
            console.warn(
                "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
            );
            this.enableZoom = false;
        }
    }

    protected dollyOut(dollyScale: number): void {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.scale *= dollyScale;
        } else if (this.camera instanceof THREE.OrthographicCamera) {
            this.camera.zoom = Math.max(
                this.minZoom,
                Math.min(
                    this.maxZoom,
                    this.camera.zoom / dollyScale
                )
            );
            this.camera.updateProjectionMatrix();
            this.zoomChanged = true;
        } else {
            console.warn(
                "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
            );
            this.enableZoom = false;
        }
    }

    //
    // event callbacks - update the object state
    //

    protected handleMouseDownRotate = (event: MouseEvent): void => {
        this.rotateStart.set(event.clientX, event.clientY);
    }

    protected handleMouseDownDolly = (event: MouseEvent): void => {
        this.dollyStart.set(event.clientX, event.clientY);
    }

    protected handleMouseDownPan = (event: MouseEvent): void => {
        this.panStart.set(event.clientX, event.clientY);
    }

    protected handleMouseMoveRotate = (event: MouseEvent): void => {
        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);

        const element = this.domElement;

        this.rotateLeft(
            2 * Math.PI * this.rotateDelta.x / element.clientHeight
        ); // yes, height
        this.rotateUp(
            2 * Math.PI * this.rotateDelta.y / element.clientHeight
        );
        this.rotateStart.copy(this.rotateEnd);

        this.update();
    }

    protected handleMouseMoveDolly = (event: MouseEvent): void => {
        this.dollyEnd.set(event.clientX, event.clientY);
        this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);

        if (this.dollyDelta.y > 0) {
            this.dollyIn(this.zoomScale);
        } else if (this.dollyDelta.y < 0) {
            this.dollyOut(this.zoomScale);
        }

        this.dollyStart.copy(this.dollyEnd);
        this.update();
    }

    protected handleMouseMovePan = (event: MouseEvent): void => {
        this.panEnd.set(event.clientX, event.clientY);
        this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed);
        this.pan(this.panDelta.x, this.panDelta.y);
        this.panStart.copy(this.panEnd);
        this.update();
    }

    protected handleMouseUp = (event: MouseEvent): void => {
    }

    protected handleMouseWheel = (event: WheelEvent): void => {
        if (event.deltaY < 0) {
            this.dollyOut(this.zoomScale);
        } else if (event.deltaY > 0) {
            this.dollyIn(this.zoomScale);
        }

        this.update();
    }

    protected handleKeyDown = (event: KeyboardEvent): void => {
        switch (event.keyCode) {
            case this.keys.UP:
                this.pan(0, this.keyPanSpeed);
                this.update();
                break;

            case this.keys.BOTTOM:
                this.pan(0, -this.keyPanSpeed);
                this.update();
                break;

            case this.keys.LEFT:
                this.pan(this.keyPanSpeed, 0);
                this.update();
                break;

            case this.keys.RIGHT:
                this.pan(-this.keyPanSpeed, 0);
                this.update();
                break;
        }
    }

    protected handleTouchStartRotate = (event: TouchEvent): void => {
        this.rotateStart.set(
            event.touches[0].pageX,
            event.touches[0].pageY
        );
    }

    protected handleTouchStartDollyPan = (event: TouchEvent): void => {
        if (this.enableZoom) {
            const dx = event.touches[0].pageX - event.touches[1].pageX;
            const dy = event.touches[0].pageY - event.touches[1].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            this.dollyStart.set(0, distance);
        }

        if (this.enablePan) {
            const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
            const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

            this.panStart.set(x, y);
        }
    }

    protected handleTouchMoveRotate = (event: TouchEvent): void => {
        this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);

        const element = this.domElement;

        this.rotateLeft(2*Math.PI*this.rotateDelta.x/element.clientHeight); // yes, height
        this.rotateUp(2*Math.PI*this.rotateDelta.y/element.clientHeight);

        this.rotateStart.copy(this.rotateEnd);

        this.update();
    }

    protected handleTouchMoveDollyPan = (event: TouchEvent): void => {
        if (this.enableZoom) {
            const dx = event.touches[0].pageX - event.touches[1].pageX;
            const dy = event.touches[0].pageY - event.touches[1].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            this.dollyEnd.set(0, distance);
            this.dollyDelta.set(0, Math.pow(this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed));

            this.dollyIn(this.dollyDelta.y);
            this.dollyStart.copy(this.dollyEnd);
        }

        if (this.enablePan) {
            const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
            const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

            this.panEnd.set(x, y);

            this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed);
            this.pan(this.panDelta.x, this.panDelta.y);
            this.panStart.copy(this.panEnd);
        }

        this.update();
    }

    protected handleTouchEnd = (event: TouchEvent): void => { }

    //
    // event handlers - FSM: listen for events and reset state
    //

    protected onMouseDown = (event: MouseEvent): void => {
        if (!this.enabled) return;
        
        event.preventDefault();

        switch (event.button) {
            case this.mouseButtons.LEFT:
                if (event.ctrlKey || event.metaKey || event.shiftKey) {
                    if (!this.enablePan) return;

                    this.handleMouseDownPan(event);
                    this.state = this.STATE.PAN;
                } else {
                    if (!this.enableRotate) return;

                    this.handleMouseDownRotate(event);
                    this.state = this.STATE.ROTATE;
                }
                break;

            case this.mouseButtons.MIDDLE:
                if (!this.enableZoom) return;

                this.handleMouseDownDolly(event);
                this.state = this.STATE.DOLLY;
                break;

            case this.mouseButtons.RIGHT:
                if (!this.enablePan) return;

                this.handleMouseDownPan(event);
                this.state = this.STATE.PAN;
                break;
        }

        if (this.state !== this.STATE.NONE) {
            document.addEventListener("mousemove", this.onMouseMove, false);
            document.addEventListener("mouseup", this.onMouseUp, false);
            this.dispatchEvent(this.startEvent);
        }
    }

    protected onMouseMove = (event: MouseEvent): void => {
        if (!this.enabled) return;

        event.preventDefault();

        switch (this.state) {
            case this.STATE.ROTATE:
                if (!this.enableRotate) return;
                this.handleMouseMoveRotate(event);
                break;

            case this.STATE.DOLLY:
                if (!this.enableZoom) return;
                this.handleMouseMoveDolly(event);
                break;

            case this.STATE.PAN:
                if (!this.enablePan) return;
                this.handleMouseMovePan(event);
                break;
        }

    }

    protected onMouseUp = (event: MouseEvent): void => {
        if (!this.enabled) return;

        this.handleMouseUp(event);

        document.removeEventListener("mousemove", this.onMouseMove, false);
        document.removeEventListener("mouseup", this.onMouseUp, false);
        this.dispatchEvent(this.endEvent);

        this.state = this.STATE.NONE;
    }

    protected onMouseWheel = (event: WheelEvent): void => {
        if (
            !this.enabled ||
            !this.enableZoom ||
            (this.state !== this.STATE.NONE && this.state !== this.STATE.ROTATE)
        ) return;

        event.preventDefault();
        event.stopPropagation();

        this.dispatchEvent(this.startEvent);
        this.handleMouseWheel(event);
        this.dispatchEvent(this.endEvent);
    }

    protected onKeyDown = (event: KeyboardEvent): void => {
        if (
            !this.enabled ||
            !this.enableKeys ||
            !this.enablePan
        ) return;

        this.handleKeyDown(event);
    }

    protected onTouchStart = (event: TouchEvent): void => {
        if (!this.enabled) return;

        event.preventDefault();

        switch (event.touches.length) {
            case 1: // one-fingered touch: rotate
                if (!this.enableRotate) return;

                this.handleTouchStartRotate(event);
                this.state = this.STATE.TOUCH_ROTATE;
                break;

            case 2: // two-fingered touch: dolly-pan
                if (!this.enableZoom && !this.enablePan) return;

                this.handleTouchStartDollyPan(event);
                this.state = this.STATE.TOUCH_DOLLY_PAN;
                break;

            default:
                this.state = this.STATE.NONE;
                break;
        }

        if (this.state !== this.STATE.NONE) {
            this.dispatchEvent(this.startEvent);
        }
    }

    protected onTouchMove = (event: TouchEvent): void => {
        if (!this.enabled) return;

        event.preventDefault();
        event.stopPropagation();

        switch (event.touches.length) {
            case 1: // one-fingered touch: rotate
                if (!this.enableRotate) return;
                if (this.state !== this.STATE.TOUCH_ROTATE) return; // is this needed?

                this.handleTouchMoveRotate(event);
                break;

            case 2: // two-fingered touch: dolly-pan
                if (!this.enableZoom && !this.enablePan) return;
                if (this.state !== this.STATE.TOUCH_DOLLY_PAN) return; // is this needed?

                this.handleTouchMoveDollyPan(event);
                break;

            default:
                this.state = this.STATE.NONE;
        }
    }

    protected onTouchEnd = (event: TouchEvent): void => {
        if (!this.enabled) return;

        this.handleTouchEnd(event);

        this.dispatchEvent(this.endEvent);
        this.state = this.STATE.NONE;
    }

    protected onContextMenu = (event: MouseEvent): void => {
        if (!this.enabled) return;
        event.preventDefault();
    }
}

export default OrbitControls;