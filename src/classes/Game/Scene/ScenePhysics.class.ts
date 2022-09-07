import * as CANNON from "cannon-es";

class ScenePhysics extends CANNON.World {
    constructor(options?: {
        gravity?: CANNON.Vec3;
        frictionGravity?: CANNON.Vec3; 
        allowSleep?: boolean;
        broadphase?: CANNON.Broadphase;
        solver?: CANNON.Solver;
        quatNormalizeFast?: boolean;
        quatNormalizeSkip?: number;
    }) {
        super(options);
    }
}

export default ScenePhysics;