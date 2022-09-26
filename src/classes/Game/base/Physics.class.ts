import * as CANNON from "cannon-es";
import { Game } from "@local/classes";

class Physics extends CANNON.World {
    public bodies: Game.Body[];

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
            json.frictionGravity = {
                x: this.frictionGravity.x,
                y: this.frictionGravity.y,
                z: this.frictionGravity.z,
            };
        }

        return json;
    }

    public static fromJSON(json: Game.PhysicsFormat): Physics {
        const physics = json;
        const options: any = {};

        if (physics.gravity) {
            options.gravity = new CANNON.Vec3(
                physics.gravity.x,
                physics.gravity.y,
                physics.gravity.z
            );
        }

        if (physics.frictionGravity) {
            options.frictionGravity = new CANNON.Vec3(
                physics.frictionGravity.x,
                physics.frictionGravity.y,
                physics.frictionGravity.z
            );
        }

        options.allowSleep = !!physics.allowSleep;

        if (physics.broadphase) {
            const broadphase = new CANNON.Broadphase();
            broadphase.useBoundingBoxes = !!physics.broadphase.useBoundingBoxes;
            broadphase.dirty = !!physics.broadphase.dirty;

            options.broadphase = broadphase;
        }

        options.quatNormalizeFast = !!physics.quatNormalizeFast;
        options.quatNormalizeSkip = !!physics.quatNormalizeSkip;

        return new Physics(options);
    }
}

export default Physics;