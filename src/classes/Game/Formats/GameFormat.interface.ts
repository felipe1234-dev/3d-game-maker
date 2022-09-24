import StageFormat from "./StageFormat.interface";
import SceneFormat from "./SceneFormat.interface";

interface GameFormat {
    uuid: string;
    name: string;
    description: string;
    stages: StageFormat[];
    scenes: SceneFormat[];
    cameras: object[];
    renderer: object
}

export default GameFormat;