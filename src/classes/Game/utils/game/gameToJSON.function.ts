import { Game } from "@local/classes";

function gameToJSON(game: Game.Core): Game.Formats.Game {
    const json: Game.Formats.Game = {
        id: game.id,
        uuid: game.uuid,
        name: game.name,
        description: game.description,
        stages: [],
        scenes: [],
        cameras: [],
        renderer: Game.Utils.renderer.toJSON(game.renderer),
        current: {
            scene: game.currentScene?.uuid || "",
            stage: game.currentStage?.uuid || "",
            camera: game.currentCamera?.uuid || "",
        },
    };

    for (const stage of game.stages) {
        json.stages.push(Game.Utils.stage.toJSON(stage));
    }

    for (const scene of game.scenes) {
        json.scenes.push(Game.Utils.scene.toJSON(scene));
    }

    /* for (const camera of game.cameras) {
        json.cameras.push(Game.Utils.camera.toJSON(camera));
    }*/

    return json;
}

export default gameToJSON;