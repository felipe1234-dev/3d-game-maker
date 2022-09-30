import { Game } from "@local/classes";

function sceneToJSON(scene: Game.Scene): Game.Formats.Scene {
    const json = scene.toJSON() as Game.Formats.Scene;

    json.object.id = scene.id;
    if (scene.stage) json.object.stage = scene.stage.uuid;
    if (scene.game) json.object.game = scene.game.uuid;

    json.bodies = [];
    for (const body of scene.physics.bodies) {
        json.bodies.push(body.toJSON());
    }

    json.object.physics = Game.Utils.physics.toJSON(scene.physics);

    return json;
}

export default sceneToJSON;