import * as Controls from "three-controls";
import * as Editor from "./index";

class TransformControls extends Controls.TransformControls {
    public core: Editor.Core;
    
    constructor(
        camera: THREE.Camera, 
        canvas: HTMLCanvasElement, 
        core: Editor.Core
    ) {
        super(camera, canvas);
        this.core = core;
    }
}

export default TransformControls;