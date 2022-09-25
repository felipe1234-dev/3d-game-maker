import StageFormat from "./StageFormat.interface";
import SceneFormat from "./SceneFormat.interface";
import RendererFormat from "./RendererFormat.interface";

interface GameFormat {
    uuid: string;
    name: string;
    description: string;
    stages: StageFormat[];
    scenes: SceneFormat[];
    cameras: object[];
    renderer: RendererFormat;
}

export default GameFormat;