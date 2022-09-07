import * as CANNON from "cannon-es";

class GamePhysics extends CANNON.World {
    constructor(options?: {
        gravity?: CANNON.Vec3 | undefined;
        frictionGravity?: CANNON.Vec3 | undefined;
        allowSleep?: boolean | undefined;
        broadphase?: CANNON.Broadphase | undefined;
        solver?: CANNON.Solver | undefined;
        quatNormalizeFast?: boolean | undefined;
        quatNormalizeSkip?: number | undefined;
    }) {
        super(options);
    }
}

export default GamePhysics;