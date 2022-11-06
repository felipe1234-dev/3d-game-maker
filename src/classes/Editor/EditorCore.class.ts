import * as THREE from "three";
import * as Editor from "./index";
import * as Game from "../Game";

import GravityHelper from "./Helpers/GravityHelper.class";
import GridsHelper from "./Helpers/GridsHelper.class";
import VertexHelper from "./Helpers/VertexHelper.class";

class EditorCore {
    public game: Game.Core;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: Editor.Orbit;
    public transformControls: Editor.Transform;

    public gridsHelper: GridsHelper;
    public gravityHelper: GravityHelper;
    public vertexHelper: VertexHelper;

    constructor(game: Game.Core) {
        this.game = game;

        const fov = 75;
        const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } =
            game.renderer.canvas;
        const aspect = canvasWidth / canvasHeight;
        const near = 0.1;
        const far = 1000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        const onResize = (): void => {
            this.camera.aspect =
                game.renderer.canvas.offsetWidth /
                game.renderer.canvas.offsetHeight;
            this.camera.updateProjectionMatrix();
        };

        window.addEventListener("resize", onResize);
        new ResizeObserver(onResize).observe(game.renderer.canvas);

        this.orbitControls = new Editor.Orbit(
            this.camera,
            game.renderer.canvas,
            this
        );
        this.transformControls = new Editor.Transform(
            this.camera,
            game.renderer.canvas,
            this
        );

        this.gridsHelper = new GridsHelper(this);
        this.gravityHelper = new GravityHelper(
            this,
            this.gridsHelper.parameters.size
        );
        this.vertexHelper = new VertexHelper("#62dafb", this);

        this.transformControls.addToBlacklist(
            this.gridsHelper,
            this.gravityHelper
        );

        game.addEventListener("selectScene", evt => {
            const currentScene = evt.currentScene as Game.Scene | undefined;
            const previousScene = evt.previousScene as Game.Scene | undefined;
            if (!currentScene || !previousScene) return;

            const updateGravityHelper = () => {
                const { x, y, z } = currentScene.physics.gravity;

                this.gravityHelper.gx = x;
                this.gravityHelper.gy = y;
                this.gravityHelper.gz = z;

                this.gravityHelper.needsUpdate = true;
            };

            currentScene.physics.addEventListener("changeGravity", () =>
                updateGravityHelper()
            );
            currentScene.physics.dispatchEvent({
                type: "changeGravity",
                currentGravity: currentScene.physics.gravity,
                previousGravity: currentScene.physics.gravity,
            });

            previousScene.remove(this.gravityHelper);
            currentScene.add(this.gravityHelper);

            previousScene.remove(this.gridsHelper);
            currentScene.add(this.gridsHelper);
        });

        game.dispatchEvent({
            type: "selectScene",
            currentScene: game.currentScene,
            previousScene: game.currentScene,
        });
    }

    public async saveGame(): Promise<[Game.Formats.Game, File]> {
        return new Promise(async (resolve, reject) => {
            try {
                this.transformControls.unselect();

                for (const scene of this.game.scenes) {
                    scene.remove(
                        this.transformControls,
                        this.gridsHelper,
                        this.gravityHelper,
                        this.vertexHelper
                    );
                }

                this.game.pause();

                const format = this.game.toJSON();

                const dataURL = this.game.renderer.canvas.toDataURL("image/png", 1.0);
                const data = await fetch(dataURL)
                const blob = await data.blob();

                const filename = `${format.uuid}.png`;
                const file = new File([blob], filename, {
                    type: "image/png",
                    lastModified: new Date().getTime()
                });

                this.game.current.scene?.add(
                    this.transformControls,
                    this.gridsHelper,
                    this.gravityHelper,
                    this.vertexHelper
                );

                this.game.unpause();

                resolve([format, file]);
            } catch (err) {
                reject(err);
            }
        });
    }

    public start(container: HTMLElement): void {
        if (!this.game.current.scene) return;

        this.camera.position.set(0, 10, 10);
        this.orbitControls.update();

        this.game.renderer.setContainer(container);

        this.game.renderer.disablePhysics();

        const onResize = () => {
            this.camera.aspect =
                this.game.renderer.canvas.offsetWidth /
                this.game.renderer.canvas.offsetHeight;
            this.camera.updateProjectionMatrix();
        };

        window.addEventListener(
            "resize",
            onResize
        );
        new ResizeObserver(onResize).observe(container);

        this.game.renderer.start(
            () => { },
            this.game.current.scene,
            this.camera
        );
    }
}

export default EditorCore;