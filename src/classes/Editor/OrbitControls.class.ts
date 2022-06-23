import * as THREE from "three";
import * as ThreeControls from "@local/three-controls";
import * as Editor from "./index";

class OrbitControls extends ThreeControls.OrbitControls {
    private core: Editor.Core;
    
    constructor(
        camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, 
        canvas: HTMLCanvasElement, 
        core: Editor.Core
    ) {
        super(camera, canvas);
        this.core = core;
    }
    
    public get canvas(): HTMLCanvasElement {
        return this.core.renderer.domElement;
    }
    
    public zoomIn = (): void => this.dollyOut(this.zoomScale);
    
    public zoomOut = (): void => this.dollyIn(this.zoomScale);
}

export default OrbitControls;