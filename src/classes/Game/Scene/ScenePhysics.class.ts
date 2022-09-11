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
                    type: "editGravity",
                    previousGravity,
                    currentGravity
                });

                return true;
            },

            get: function(gravity, prop) {
                if (prop === "set") {
                    return new Proxy(gravity[prop], {
                        apply: (setGravity, thisScope, args: [x: number, y: number, z: number]) => {
                            scope.dispatchEvent({
                                type: "editGravity",
                                previousGravity: gravity,
                                currentGravity: setGravity(...args)
                            });

                            return setGravity(...args);
                        }
                    });
                } else {
                    return gravity[prop as keyof typeof gravity];
                }
            }
        });
    }
}

export default ScenePhysics;