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

        game.addEventListener("changeScene", evt => {
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
            type: "changeScene",
            currentScene: game.currentScene,
            previousScene: game.currentScene,
        });
    }

    public removeEditorStuff(): void {
        for (const scene of this.game.scenes) {
            scene.remove(
                this.transformControls,
                this.gridsHelper,
                this.gravityHelper,
                this.vertexHelper
            );
        }
    }
}

export default EditorCore;