import StageFormat from "./Stage.interface";
import SceneFormat from "./Scene.interface";
import RendererFormat from "./Renderer.interface";

interface Game {
    id: number;
    uuid: string;
    name: string;
    description: string;
    stages: StageFormat[];
    scenes: SceneFormat[];
    cameras: object[];
    renderer: RendererFormat;
    current: {
        scene: string;
        stage: string;
        camera: string;
    };
}

export default Game;