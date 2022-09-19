import * as THREE from "three";

class Renderer extends THREE.WebGLRenderer {
    protected canvasContainer?: HTMLElement;
    protected animationId?: number;

    constructor(params?: THREE.WebGLRendererParameters) {
        super(params);
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
        
        container.appendChild(this.canvas);
        
        const onResize = (): void => {
            this.setSize(container.offsetWidth, container.offsetHeight);
        }

        window.addEventListener("resize", onResize);
        new ResizeObserver(onResize).observe(container);
    }

    public startAnimation(
        callback: Function, 
        scene: THREE.Scene, 
        camera: THREE.Camera
    ): void {
        const animate = () => {
            callback();
                
            this.render(scene, camera);
            window.requestAnimationFrame(animate);
        }
        
        this.animationId = window.requestAnimationFrame(animate);
    }
    
    public stopAnimation(): void {
        if (this.animationId === undefined) {
            return;
        }
        
        window.cancelAnimationFrame(this.animationId);
    }
}

export default Renderer;