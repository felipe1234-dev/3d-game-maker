import * as THREE from "three";
import { Editor } from "..";

class EditorRenderer extends THREE.WebGLRenderer {
    private canvasContainer?: HTMLElement;
    private editor: Editor.Core;
    private animation?: number;
    
    constructor(editor: Editor.Core, params?: THREE.WebGLRendererParameters) {
        super(params);
        this.editor = editor;
    }
    
    public get canvas(): HTMLCanvasElement {
        return this.domElement;
    }
    
    public get container(): HTMLElement | undefined {
        return this.canvasContainer;
    }
    
    public set container(container: HTMLElement | undefined) {
        if (!container) {
            const oldContainer = this.canvasContainer;
            
            const childNodes = oldContainer?.childNodes ?? [];
            oldContainer?.replaceWith(...childNodes);
            
            return;
        }
        
        this.canvasContainer = container;
        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(container.offsetWidth, container.offsetHeight);
        
        const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = this.canvas;
        const { camera } = this.editor;
        
        camera.aspect = canvasWidth/canvasHeight;
        
        container.appendChild(this.canvas);
        
        const onResize = (): void => {
            this.setSize(container.offsetWidth, container.offsetHeight);
            camera.aspect = this.canvas.offsetWidth/this.canvas.offsetHeight;
            camera.updateProjectionMatrix();
        }
        
        window.addEventListener("resize", onResize);
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);
    }
    
    public startAnimation(callback: Function): void {
        const animate = () => {


            const { game, camera } = this.editor;
            const { scene: currentScene } = game.current;

            if (currentScene) {
                callback();
                
                this.render(currentScene, camera);
                window.requestAnimationFrame(animate); 
            }
        }
        
        this.animation = window.requestAnimationFrame(animate);
    }
    
    public stopAnimation(): void {
        if (this.animation === undefined) {
            return;
        }
        
        window.cancelAnimationFrame(this.animation);
    }
}

export default EditorRenderer;