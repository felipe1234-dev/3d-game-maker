import * as CANNON from "cannon-es";

interface PhysicsOptions {
    gravity?: CANNON.Vec3;
    frictionGravity?: CANNON.Vec3;
    allowSleep?: boolean;
    broadphase?: CANNON.Broadphase;
    solver?: CANNON.Solver;
    quatNormalizeFast?: boolean;
    quatNormalizeSkip?: number;
}

export default PhysicsOptions;