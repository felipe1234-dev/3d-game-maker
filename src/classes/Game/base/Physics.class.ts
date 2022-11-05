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

    public toJSON(): Game.Formats.Physics {
        const json: Game.Formats.Physics = {
            gravity: this.gravity.toArray(),
            allowSleep: this.allowSleep,
            broadphase: {
                useBoundingBoxes: this.broadphase.useBoundingBoxes,
                dirty: this.broadphase.dirty,
            },
            quatNormalizeFast: this.quatNormalizeFast,
            quatNormalizeSkip: this.quatNormalizeSkip,
        };

        if (this.frictionGravity) {
            json.frictionGravity = this.frictionGravity.toArray();
        }

        return json;
    }

    public static fromJSON(json: Game.Formats.Physics): Physics {
        const options: Game.PhysicsOptions = {};

        {
            const [x, y, z] = json.gravity;
            options.gravity = new CANNON.Vec3(x, y, z);
        }

        if (json.frictionGravity) {
            const [x, y, z] = json.frictionGravity;
            options.frictionGravity = new CANNON.Vec3(x, y, z);
        }

        options.allowSleep = json.allowSleep;

        {
            const broadphase = new CANNON.NaiveBroadphase();
            broadphase.useBoundingBoxes = json.broadphase.useBoundingBoxes;
            broadphase.dirty = json.broadphase.dirty;

            options.broadphase = broadphase;
        }

        options.quatNormalizeFast = json.quatNormalizeFast;
        options.quatNormalizeSkip = json.quatNormalizeSkip;

        return new Physics(options);
    }
}

export default Physics;
export type { PhysicsOptions };