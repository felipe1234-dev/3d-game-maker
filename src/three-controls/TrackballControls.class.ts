/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga  / http://lantiga.github.io
 */

import * as THREE from "three";

const STATE = {
    NONE: - 1,
    ROTATE: 0,
    ZOOM: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_ZOOM_PAN: 4
};
const EPS = 0.000001;
const keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];
const changeEvent = { type: "change" };
const startEvent = { type: "start" };
const endEvent = { type: "end" };

class TrackballControls extends THREE.EventDispatcher {
    public camera: THREE.Camera;
    public domElement: HTMLElement;
    public readonly isTrackballControls: true;
    public enabled: boolean;
    public screen: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    public rotateSpeed: number;
    public zoomSpeed: number;
    public panSpeed: number;
    public noRotate: boolean;
    public noZoom: boolean;
    public noPan: boolean;
    public staticMoving: boolean;
    public dynamicDampingFactor: number;
    public minDistance: number;
    public maxDistance: number;
    public target: THREE.Vector3;

    protected target0: THREE.Vector3;
    protected position0: THREE.Vector3;
    protected up0: THREE.Vector3;

    protected state: number;
    protected prevState: number;

    protected lastPosition: THREE.Vector3;
    protected eye: THREE.Vector3;

    protected movePrev: THREE.Vector2;
    protected moveCurr: THREE.Vector2;

    protected lastAxis: THREE.Vector3;
    protected lastAngle: number;

    protected zoomStart: THREE.Vector2;
    protected zoomEnd: THREE.Vector2;

    protected touchZoomDistanceStart: number;
    protected touchZoomDistanceEnd: number;

    protected panStart: THREE.Vector2;
    protected panEnd: THREE.Vector2;

    public handleResize: () => void;
    public rotateCamera: () => void;
    public zoomCamera: () => void;
    public panCamera: () => void;
    public checkDistances: () => void;
    public update: () => void;
    public reset: () => void;
    public dispose: () => void;
    
    constructor(camera: THREE.Camera, domElement: HTMLElement) {
        super();
        this.camera = camera;
        this.domElement = domElement;
        this.isTrackballControls = true;
        this.enabled = true;

        this.screen = { left: 0, top: 0, width: 0, height: 0 };

        this.rotateSpeed = 1.0;
        this.zoomSpeed = 1.2;
        this.panSpeed = 0.3;

        this.noRotate = false;
        this.noZoom = false;
        this.noPan = false;

        this.staticMoving = false;
        this.dynamicDampingFactor = 0.2;

        this.minDistance = 0;
        this.maxDistance = Infinity;

        this.target = new THREE.Vector3();

        this.lastPosition = new THREE.Vector3();

        this.state = STATE.NONE;
        this.prevState = STATE.NONE;

        this.eye = new THREE.Vector3();

        this.movePrev = new THREE.Vector2();
        this.moveCurr = new THREE.Vector2();

        this.lastAxis = new THREE.Vector3();
        this.lastAngle = 0;

        this.zoomStart = new THREE.Vector2();
        this.zoomEnd = new THREE.Vector2();

        this.touchZoomDistanceStart = 0;
        this.touchZoomDistanceEnd = 0;

        this.panStart = new THREE.Vector2();
        this.panEnd = new THREE.Vector2();

        // for reset

        this.target0 = this.target.clone();
        this.position0 = this.camera.position.clone();
        this.up0 = this.camera.up.clone();

        this.handleResize = () => {
            const box = this.domElement.getBoundingClientRect();
            // adjustments come from similar code in the jquery offset() function
            const d = this.domElement.ownerDocument.documentElement;
            
            this.screen.left = box.left + window.pageXOffset - d.clientLeft;
            this.screen.top = box.top + window.pageYOffset - d.clientTop;
            this.screen.width = box.width;
            this.screen.height = box.height;
        }

        const getMouseOnScreen = (() => {
            let vector = new THREE.Vector2();

            const getMouseOnScreen = (pageX: number, pageY: number) => {
                vector.set(
                    (pageX - this.screen.left) / this.screen.width,
                    (pageY - this.screen.top) / this.screen.height
                );

                return vector;
            }
            
            return getMouseOnScreen;
        })();

        const getMouseOnCircle = (() => {
            let vector = new THREE.Vector2();

            const getMouseOnCircle = (pageX: number, pageY: number) => {

                vector.set(
                    ((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5)),
                    ((this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width) // screen.width intentional
                );

                return vector;

            }
            
            return getMouseOnCircle;
        })();

        this.rotateCamera = (() => {
            let axis = new THREE.Vector3(),
                quaternion = new THREE.Quaternion(),
                eyeDirection = new THREE.Vector3(),
                objectUpDirection = new THREE.Vector3(),
                objectSidewaysDirection = new THREE.Vector3(),
                moveDirection = new THREE.Vector3(),
                angle: number;

            const rotateCamera = () => {
                moveDirection.set(
                    this.moveCurr.x - this.movePrev.x, 
                    this.moveCurr.y - this.movePrev.y, 
                    0
                );
                angle = moveDirection.length();

                if (angle) {
                    this.eye.copy(this.camera.position).sub(this.target);

                    eyeDirection.copy(this.eye).normalize();
                    objectUpDirection.copy(this.camera.up).normalize();
                    objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();

                    objectUpDirection.setLength(this.moveCurr.y - this.movePrev.y);
                    objectSidewaysDirection.setLength(this.moveCurr.x - this.movePrev.x);

                    moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));

                    axis.crossVectors(moveDirection, this.eye).normalize();

                    angle *= this.rotateSpeed;
                    quaternion.setFromAxisAngle(axis, angle);

                    this.eye.applyQuaternion(quaternion);
                    this.camera.up.applyQuaternion(quaternion);

                    this.lastAxis.copy(axis);
                    this.lastAngle = angle;
                } else if (!this.staticMoving && this.lastAngle) {
                    this.lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
                    this.eye.copy(this.camera.position).sub(this.target);
                    
                    quaternion.setFromAxisAngle(this.lastAxis, this.lastAngle);
                    
                    this.eye.applyQuaternion(quaternion);
                    this.camera.up.applyQuaternion(quaternion);
                }

                this.movePrev.copy(this.moveCurr);
            }
            
            return rotateCamera;
        })();

        this.zoomCamera = () => {
            let factor: number;

            if (this.state === STATE.TOUCH_ZOOM_PAN) {
                factor = this.touchZoomDistanceStart / this.touchZoomDistanceEnd;
                
                this.touchZoomDistanceStart = this.touchZoomDistanceEnd;
                this.eye.multiplyScalar(factor);
            } else {
                factor = 1.0 + (this.zoomEnd.y - this.zoomStart.y) * this.zoomSpeed;

                if (factor !== 1.0 && factor > 0.0) {
                    this.eye.multiplyScalar(factor);
                }

                if (this.staticMoving) {
                    this.zoomStart.copy(this.zoomEnd);
                } else {
                    this.zoomStart.y += 
                        (this.zoomEnd.y - this.zoomStart.y) * this.dynamicDampingFactor;
                }
            }
        }

        this.panCamera = (() => {
            let mouseChange = new THREE.Vector2(),
                objectUp = new THREE.Vector3(),
                pan = new THREE.Vector3();

            const panCamera = () => {
                mouseChange.copy(this.panEnd).sub(this.panStart);

                if (mouseChange.lengthSq()) {
                    mouseChange.multiplyScalar(this.eye.length() * this.panSpeed);

                    pan.copy(this.eye).cross(this.camera.up).setLength(mouseChange.x);
                    pan.add(objectUp.copy(this.camera.up).setLength(mouseChange.y));

                    this.camera.position.add(pan);
                    this.target.add(pan);

                    if (this.staticMoving) {
                        this.panStart.copy(this.panEnd);
                    } else {
                        this.panStart.add(
                            mouseChange
                                .subVectors(this.panEnd, this.panStart)
                                .multiplyScalar(this.dynamicDampingFactor)
                        );
                    }
                }
            }

            return panCamera;
        })();

        this.checkDistances = () => {
            if (!this.noZoom || !this.noPan) {
                if (this.eye.lengthSq() > this.maxDistance * this.maxDistance) {
                    this.camera.position.addVectors(
                        this.target, 
                        this.eye.setLength(this.maxDistance)
                    );
                    this.zoomStart.copy(this.zoomEnd);
                }

                if (this.eye.lengthSq() < this.minDistance * this.minDistance) {
                    this.camera.position.addVectors(
                        this.target, 
                        this.eye.setLength(this.minDistance)
                    );
                    this.zoomStart.copy(this.zoomEnd);
                }
            }
        }

        this.update = () => {
            this.eye.subVectors(this.camera.position, this.target);

            if (!this.noRotate) {
                this.rotateCamera();
            }

            if (!this.noZoom) {
                this.zoomCamera();
            }

            if (!this.noPan) {
                this.panCamera();
            }

            this.camera.position.addVectors(this.target, this.eye);

            this.checkDistances();

            this.camera.lookAt(this.target);

            if (this.lastPosition.distanceToSquared(this.camera.position) > EPS) {
                this.dispatchEvent(changeEvent);
                this.lastPosition.copy(this.camera.position);
            }
        }
        
        this.reset = () => {
            this.state = STATE.NONE;
            this.prevState = STATE.NONE;

            this.target.copy(this.target0);
            this.camera.position.copy(this.position0);
            this.camera.up.copy(this.up0);

            this.eye.subVectors(this.camera.position, this.target);

            this.camera.lookAt(this.target);

            this.dispatchEvent(changeEvent);

            this.lastPosition.copy(this.camera.position);
        }

        // listeners

        const keydown = (event: KeyboardEvent) => {
            if (!this.enabled) return;

            window.removeEventListener("keydown", keydown);

            this.prevState = this.state;

            if (this.state !== STATE.NONE) {
                return;
            } else if (event.keyCode === keys[STATE.ROTATE] && !this.noRotate) {
                this.state = STATE.ROTATE;
            } else if (event.keyCode === keys[STATE.ZOOM] && !this.noZoom) {
                this.state = STATE.ZOOM;
            } else if (event.keyCode === keys[STATE.PAN] && !this.noPan) {
                this.state = STATE.PAN;
            }

        }

        const keyup = (event: KeyboardEvent) => {
            if (this.enabled === false) return;

            this.state = this.prevState;

            window.addEventListener("keydown", keydown, false);
        }

        const mousedown = (event: MouseEvent) => {
            if (this.enabled === false) return;

            event.preventDefault();
            event.stopPropagation();

            if (this.state === STATE.NONE) {

                this.state = event.button;

            }

            if (this.state === STATE.ROTATE && !this.noRotate) {
                this.moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
                this.movePrev.copy(this.moveCurr);
            } else if (this.state === STATE.ZOOM && !this.noZoom) {
                this.zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
                this.zoomEnd.copy(this.zoomStart);
            } else if (this.state === STATE.PAN && !this.noPan) {
                this.panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
                this.panEnd.copy(this.panStart);
            }

            document.addEventListener("mousemove", mousemove, false);
            document.addEventListener("mouseup", mouseup, false);

            this.dispatchEvent(startEvent);
        }

        const mousemove = (event: MouseEvent) => {

            if (this.enabled === false) return;

            event.preventDefault();
            event.stopPropagation();

            if (this.state === STATE.ROTATE && !this.noRotate) {

                this.movePrev.copy(this.moveCurr);
                this.moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));

            } else if (this.state === STATE.ZOOM && !this.noZoom) {

                this.zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));

            } else if (this.state === STATE.PAN && !this.noPan) {

                this.panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));

            }

        }

        const mouseup = (event: MouseEvent) => {

            if (this.enabled === false) return;

            event.preventDefault();
            event.stopPropagation();

            this.state = STATE.NONE;

            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            this.dispatchEvent(endEvent);

        }

        const mousewheel = (event: WheelEvent) => {

            if (this.enabled === false) return;

            if (this.noZoom === true) return;

            event.preventDefault();
            event.stopPropagation();

            switch (event.deltaMode) {

                case 2:
                    // Zoom in pages
                    this.zoomStart.y -= event.deltaY * 0.025;
                    break;

                case 1:
                    // Zoom in lines
                    this.zoomStart.y -= event.deltaY * 0.01;
                    break;

                default:
                    // undefined, 0, assume pixels
                    this.zoomStart.y -= event.deltaY * 0.00025;
                    break;

            }

            this.dispatchEvent(startEvent);
            this.dispatchEvent(endEvent);

        }

        const touchstart = (event: TouchEvent) => {

            if (this.enabled === false) return;

            event.preventDefault();

            switch (event.touches.length) {

                case 1:
                    this.state = STATE.TOUCH_ROTATE;
                    this.moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    this.movePrev.copy(this.moveCurr);
                    break;

                default: // 2 or more
                    this.state = STATE.TOUCH_ZOOM_PAN;
                    let dx = event.touches[0].pageX - event.touches[1].pageX;
                    let dy = event.touches[0].pageY - event.touches[1].pageY;
                    this.touchZoomDistanceEnd = this.touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

                    let x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    let y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.panStart.copy(getMouseOnScreen(x, y));
                    this.panEnd.copy(this.panStart);
                    break;

            }

            this.dispatchEvent(startEvent);

        }

        const touchmove = (event: TouchEvent) => {

            if (this.enabled === false) return;

            event.preventDefault();
            event.stopPropagation();

            switch (event.touches.length) {
                case 1:
                    this.movePrev.copy(this.moveCurr);
                    this.moveCurr.copy(
                        getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY)
                    );
                    break;

                default: // 2 or more
                    let dx = event.touches[0].pageX - event.touches[1].pageX;
                    let dy = event.touches[0].pageY - event.touches[1].pageY;
                    this.touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

                    let x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    let y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.panEnd.copy(getMouseOnScreen(x, y));
                    break;

            }

        }

        const touchend = (event: TouchEvent) => {
            if (this.enabled === false) return;

            switch (event.touches.length) {
                case 0:
                    this.state = STATE.NONE;
                    break;

                case 1:
                    this.state = STATE.TOUCH_ROTATE;
                    this.moveCurr.copy(
                        getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY)
                    );
                    this.movePrev.copy(this.moveCurr);
                    break;

            }

            this.dispatchEvent(endEvent);
        }

        const contextmenu = (event: MouseEvent) => {
            if (!this.enabled) return;

            event.preventDefault();
        }

        this.dispose = () => {
            this.domElement.removeEventListener("contextmenu", contextmenu, false);
            this.domElement.removeEventListener("mousedown", mousedown, false);
            this.domElement.removeEventListener("wheel", mousewheel, false);

            this.domElement.removeEventListener("touchstart", touchstart, false);
            this.domElement.removeEventListener("touchend", touchend, false);
            this.domElement.removeEventListener("touchmove", touchmove, false);
            
            document.removeEventListener("mousemove", mousemove, false);
            document.removeEventListener("mouseup", mouseup, false);

            window.removeEventListener("keydown", keydown, false);
            window.removeEventListener("keyup", keyup, false);
        }

        this.domElement.addEventListener("contextmenu", contextmenu, false);
        this.domElement.addEventListener("mousedown", mousedown, false);
        this.domElement.addEventListener("wheel", mousewheel, false);

        this.domElement.addEventListener("touchstart", touchstart, false);
        this.domElement.addEventListener("touchend", touchend, false);
        this.domElement.addEventListener("touchmove", touchmove, false);

        window.addEventListener("keydown", keydown, false);
        window.addEventListener("keyup", keyup, false);

        this.handleResize();

        // force an update at start
        this.update();
    }
}

export default TrackballControls;