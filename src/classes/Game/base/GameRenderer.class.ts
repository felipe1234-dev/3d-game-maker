import { Game } from "@local/classes";
import * as THREE from "three";

class GameRenderer extends THREE.WebGLRenderer {
    public frozen: boolean = false;
    public physicsEnabled: boolean = false;
    protected canvasContainer?: HTMLElement;
    protected animationCallback?: () => void;
    protected animationId?: number;

    public get canvas(): HTMLCanvasElement {
        return this.domElement;
    }

    public get container(): HTMLElement | undefined {
        return this.canvasContainer;
    }

    public setContainer(container: HTMLElement | undefined): void {
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

    public enablePhysics(): void {
        this.physicsEnabled = true;
    }

    public disablePhysics(): void {
        this.physicsEnabled = false;
    }

    public freeze(): void {
        this.frozen = true;
    }

    public unfreeze(): void {
        this.frozen = false;
    }

    public start(
        callback: Function,
        scene: Game.Scene,
        camera: Game.Camera
    ): void {
        const animate = () => {
            if (!this.frozen) {
                if (this.physicsEnabled) {
                    scene.physics.fixedStep();

                    for (const child of scene.children) {
                        if (child instanceof Game.Mesh) {
                            child.needsUpdate = true;
                        }
                    }
                }

                callback();

                this.render(scene, camera);
            }

            window.requestAnimationFrame(animate);
        };

        this.animationCallback = animate;

        this.animationId = window.requestAnimationFrame(this.animationCallback);
    }

    public toJSON(): Game.Formats.Renderer {
        const json: Game.Formats.Renderer = {
            autoClear: this.autoClear,
            autoClearColor: this.autoClearColor,
            autoClearDepth: this.autoClearDepth,
            autoClearStencil: this.autoClearStencil,
            sortObjects: this.sortObjects,
            localClippingEnabled: this.localClippingEnabled,
            physicallyCorrectLights: this.physicallyCorrectLights,
            toneMapping: this.toneMapping,
            toneMappingExposure: this.toneMappingExposure,
            shadowMap: {
                type: this.shadowMap.type,
                enabled: this.shadowMap.enabled,
            },
            pixelRatio: this.pixelRatio,
        };

        return json;
    }

    public static fromJSON(json: Game.Formats.Renderer): GameRenderer {
        const renderer = new GameRenderer({ antialias: true });

        renderer.autoClear = json.autoClear;
        renderer.autoClearColor = json.autoClearColor;
        renderer.autoClearDepth = json.autoClearDepth;

        renderer.autoClearStencil = json.autoClearStencil;
        renderer.sortObjects = json.sortObjects;

        renderer.localClippingEnabled = json.localClippingEnabled;

        renderer.physicallyCorrectLights = json.physicallyCorrectLights;
        renderer.toneMapping = json.toneMapping;

        renderer.toneMappingExposure = json.toneMappingExposure;
        renderer.shadowMap.type = json.shadowMap.type;

        renderer.shadowMap.enabled = json.shadowMap.enabled;
        renderer.pixelRatio = json.pixelRatio;

        return renderer;
    }
}

export default GameRenderer;