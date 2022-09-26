import StageFormat from "./Stage.interface";
import SceneFormat from "./Scene.interface";
import RendererFormat from "./Renderer.interface";

interface Game {
    uuid: string;
    name: string;
    description: string;
    stages: StageFormat[];
    scenes: SceneFormat[];
    cameras: object[];
    renderer: RendererFormat;
}

export default Game;