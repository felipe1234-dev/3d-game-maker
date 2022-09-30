import { Game } from "@local/classes";

function physicsToJSON(physics: Game.Physics): Game.Formats.Physics {
    const json: Game.Formats.Physics = {
        gravity: {
            x: physics.gravity.x,
            y: physics.gravity.y,
            z: physics.gravity.z,
        },
        allowSleep: physics.allowSleep,
        broadphase: {
            useBoundingBoxes: physics.broadphase.useBoundingBoxes,
            dirty: physics.broadphase.dirty,
        },
        quatNormalizeFast: physics.quatNormalizeFast,
        quatNormalizeSkip: physics.quatNormalizeSkip,
    };

    if (physics.frictionGravity) {
        const { x, y, z } = physics.frictionGravity;
        json.frictionGravity = { x, y, z };
    }

    return json;
}

export default physicsToJSON;