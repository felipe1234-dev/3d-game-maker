import * as CANNON from "cannon-es";
import { Game } from "@local/classes";

function physicsFromJSON(json: Game.Formats.Physics): Game.Physics {
    const physics = json;
    const options: Game.PhysicsOptions = {};

    if (physics.gravity) {
        const { x, y, z } = physics.gravity;
        options.gravity = new CANNON.Vec3(x, y, z);
    }

    if (physics.frictionGravity) {
        const { x, y, z } = physics.frictionGravity;
        options.frictionGravity = new CANNON.Vec3(x, y, z);
    }

    options.allowSleep = !!physics.allowSleep;

    if (physics.broadphase) {
        const broadphase = new CANNON.Broadphase();
        broadphase.useBoundingBoxes = !!physics.broadphase.useBoundingBoxes;
        broadphase.dirty = !!physics.broadphase.dirty;

        options.broadphase = broadphase;
    }

    options.quatNormalizeFast = !!physics.quatNormalizeFast;
    options.quatNormalizeSkip = physics.quatNormalizeSkip;

    return new Game.Physics(options);
}

export default physicsFromJSON;