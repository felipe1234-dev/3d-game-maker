import * as CANNON from "cannon-es";
import { Game } from "@local/classes";

interface PhysicsOptions {
    gravity?: CANNON.Vec3;
    frictionGravity?: CANNON.Vec3;
    allowSleep?: boolean;
    broadphase?: CANNON.Broadphase;
    solver?: CANNON.Solver;
    quatNormalizeFast?: boolean;
    quatNormalizeSkip?: number;
}

class Physics extends CANNON.World {
    public bodies: Game.Body[];

    constructor(options?: PhysicsOptions) {
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
                    currentGravity,
                });

                return true;
            },
        });

        if (!options?.gravity) this.gravity.set(0, -9.82, 0);

        this.bodies = [];
    }
}

export default Physics;
export type { PhysicsOptions };