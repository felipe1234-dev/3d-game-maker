import { Game } from "@local/classes";

const stage = {
    toJSON(stage: Game.Stage): Game.Formats.Stage {
        const json: Game.Formats.Stage = {
            id: stage.id,
            uuid: stage.uuid,
            name: stage.name,
            scenes: [],
        };

        if (stage.game) json.game = stage.game.uuid;

        for (const scene of stage.scenes) {
            json.scenes.push(scene.uuid);
        }

        return json;
    },

    fromJSON(json: Game.Formats.Stage): Game.Stage {
        const stage = new Game.Stage({
            id: json.id,
            uuid: json.uuid,
            name: json.name,
        });

        return stage;
    },
};

export default stage;