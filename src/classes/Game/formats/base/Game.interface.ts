import { Stage, isStage } from "./Stage.interface";
import { Scene, isScene } from "./Scene.interface";
import { Renderer, isRenderer } from "./Renderer.interface";

interface Game {
    id: number;
    uuid: string;
    name: string;
    description: string;
    stages: Stage[];
    scenes: Scene[];
    cameras: object[];
    renderer: Renderer;
    current: {
        scene: string;
        stage: string;
        camera: string;
    };
}

function isGame(json: any): json is Game {
    if (!(json instanceof Object)) return false;

    if (typeof json.id !== "number") return false;
    if (typeof json.uuid !== "number") return false;
    if (typeof json.name !== "string") return false;
    if (typeof json.description !== "string") return false;

    if (!Array.isArray(json.stages)) return false;
    for (const item of json.stages) {
        if (!isStage(item)) return false;
    }

    if (!Array.isArray(json.scenes)) return false;
    for (const item of json.scenes) {
        if (!isScene(item)) return false;
    }

    if (!Array.isArray(json.cameras)) return false;
    for (const item of json.cameras) {
        if (!(item instanceof Object)) return false;
    }

    if (!isRenderer(json.renderer)) return false;

    if (!(json.current instanceof Object)) return false;

    if (typeof json.current.scene !== "string") return false;
    if (typeof json.current.stage !== "string") return false;
    if (typeof json.current.camera !== "string") return false;

    return true;
}

export type { Game };
export { isGame };