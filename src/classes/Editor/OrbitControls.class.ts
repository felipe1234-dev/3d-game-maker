import * as THREE from "three";
import * as Controls from "three-controls";
import * as Editor from "./index";

class OrbitControls extends Controls.OrbitControls {
    private core: Editor.Core;
    
    constructor(
        camera: THREE.Camera, 
        canvas: HTMLCanvasElement, 
        core: Editor.Core
    ) {
        super(camera, canvas);
        this.core = core;
    }
    
    public get canvas(): HTMLCanvasElement {
        return this.core.renderer.domElement;
    }
    
    private zoom(type: "in" | "out"): void {
        const wheelEvent = new WheelEvent("wheel", {
            deltaY: type === "in" ? -240 : +240,
            bubbles: true, 
            cancelable: true
        });
            
        this.canvas.dispatchEvent(wheelEvent);
    }
    
    public zoomIn = (): void => this.zoom("in");
    
    public zoomOut = (): void => this.zoom("out");
}

export default OrbitControls;