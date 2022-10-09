import { Game } from "@local/classes";
import * as CANNON from "cannon-es";

describe("Testing Game.Physics class", () => {
    test("new Game.Physics.toJSON", () => {
        const physics = new Game.Physics();
        physics.frictionGravity = new CANNON.Vec3(0, -1, 10);
        const json = physics.toJSON();

        expect(Game.Formats.isPhysics(json)).toBe(true);

        {
            const { x: px, y: py, z: pz } = physics.gravity;
            const { x: jx, y: jy, z: jz } = json.gravity;
            expect([px, py, pz]).toEqual([jx, jy, jz]);
        }

        if (json.frictionGravity) {
            const { x: px, y: py, z: pz } = physics.frictionGravity;
            const { x: jx, y: jy, z: jz } = json.frictionGravity;
            expect([px, py, pz]).toEqual([jx, jy, jz]);
        }

        expect(physics.allowSleep).toBe(json.allowSleep);
        expect(physics.quatNormalizeFast).toBe(json.quatNormalizeFast);
        expect(physics.quatNormalizeSkip).toBe(json.quatNormalizeSkip);

        expect({
            useBoundingBoxes: physics.broadphase.useBoundingBoxes,
            dirty: physics.broadphase.dirty,
        }).toEqual(json.broadphase);
    });

    test("Game.Physics.fromJSON", () => {
        const physics = new Game.Physics();
        physics.frictionGravity = new CANNON.Vec3(0, -1, 10);
        const json = physics.toJSON();
        const physicsCmp = Game.Physics.fromJSON(json);

        expect(physics.gravity).toEqual(physicsCmp.gravity);

        if (physicsCmp.frictionGravity) {
            expect(physics.frictionGravity).toEqual(physicsCmp.frictionGravity);
        } else {
            expect(physicsCmp.frictionGravity).toBeDefined();
        }

        expect(physics.allowSleep).toBe(physicsCmp.allowSleep);
        expect(physics.quatNormalizeFast).toBe(physicsCmp.quatNormalizeFast);
        expect(physics.quatNormalizeSkip).toBe(physicsCmp.quatNormalizeSkip);
        expect(physics.broadphase).toEqual(physicsCmp.broadphase);
    });
});