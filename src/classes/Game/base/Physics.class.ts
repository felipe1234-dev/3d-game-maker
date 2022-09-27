import * as CANNON from "cannon-es";
import { Game } from "@local/classes";

class Physics extends CANNON.World {
    public bodies: Game.Body[];

    constructor(options?: Game.PhysicsOptions) {
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

    public toJSON(): Game.PhysicsFormat {
        const json: Game.PhysicsFormat = {
            gravity: {
                x: this.gravity.x,
                y: this.gravity.y,
                z: this.gravity.z,
            },
            allowSleep: this.allowSleep,
            broadphase: {
                useBoundingBoxes: this.broadphase.useBoundingBoxes,
                dirty: this.broadphase.dirty,
            },
            quatNormalizeFast: this.quatNormalizeFast,
            quatNormalizeSkip: this.quatNormalizeSkip,
        };

        if (this.frictionGravity) {
            const { x, y, z } = this.frictionGravity;
            json.frictionGravity = { x, y, z };
        }

        return json;
    }

    public static fromJSON(json: Game.PhysicsFormat): Physics {
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

        return new Physics(options);
    }
}

export default Physics;