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

        const scope = this;
        this.gravity = new Proxy(this.gravity, {
            set: function (gravity, prop, value) {
                const previousGravity = gravity.clone();
                const currentGravity = gravity;

                if (prop === "x" || prop === "y" || prop === "z") {
                    gravity[prop] = Number(value);
                }

                scope.dispatchEvent({
                    type: "changeGravity",
                    previousGravity,
                    currentGravity
                });

                return true;
            }
        });

        if (!options?.gravity) this.gravity.set(0, -9.82, 0);
    }
}

export default ScenePhysics;