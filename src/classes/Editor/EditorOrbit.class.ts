import * as THREE from "three";
import * as ThreeControls from "@local/three-controls";
import * as Editor from "./index";

class EditorOrbit extends ThreeControls.OrbitControls {
    private core: Editor.Core;
    
    constructor(
        camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, 
        canvas: HTMLCanvasElement, 
        core: Editor.Core
    ) {
        super(camera, canvas);
        this.core = core;
        this.canvas.addEventListener("pointerdown", () => this.update());
        this.canvas.addEventListener("pointermove", () => this.update());
    }
    
    public get canvas(): HTMLCanvasElement {
        return this.core.renderer.domElement;
    }
    
    public zoomIn = (): void => {
        this.dollyOut(this.zoomScale);
        this.update();
    }
    
    public zoomOut = (): void => {
        this.dollyIn(this.zoomScale);
        this.update();
    }
}

export default EditorOrbit;