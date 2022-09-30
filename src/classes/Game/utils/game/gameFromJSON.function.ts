import { Game } from "@local/classes";

function gameFromJSON(json: Game.Formats.Game): Game.Core {
    const stages: Game.Stage[] = [];
    const scenes: Game.Scene[] = [];

    for (const stageJSON of json.stages) {
        const stage = Game.Utils.stage.fromJSON(stageJSON);
        const sceneJSONs = json.scenes.filter(
            sceneJSON => sceneJSON.object.stage === stage.uuid
        );

        for (const sceneJSON of sceneJSONs) {
            const scene = Game.Utils.scene.fromJSON(sceneJSON);

            stage.addScene(scene);
            scenes.push(scene);
        }

        stages.push(stage);
    }

    const game = new Game.Core({
        id: json.id,
        uuid: json.uuid,

        name: json.name,
        description: json.description,

        stages,
        scenes,
        cameras: [],

        renderer: Game.Utils.renderer.fromJSON(json.renderer),
    });

    return game;
}

export default gameFromJSON;