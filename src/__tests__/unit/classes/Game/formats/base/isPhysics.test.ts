import { Game } from "@local/classes";

describe("Testing Game.Formats.isPhysics", () => {
    test("Game.Formats.isPhysics", () => {
        let json: any = {};
        expect(Game.Formats.isPhysics(json)).toBe(false);

        json = {
            gravity: {
                x: 0,
                y: 0,
                z: 10
            },
            allowSleep: false,
            broadphase: {
                useBoundingBoxes: true,
                dirty: true,
            },
            quatNormalizeFast: false,
            quatNormalizeSkip: 2
        };
        expect(Game.Formats.isPhysics(json)).toBe(true);

        json.gravity.z = undefined;
        expect(Game.Formats.isPhysics(json)).toBe(false);

        json.gravity.z = "10";
        expect(Game.Formats.isPhysics(json)).toBe(false);

        json.gravity.z = 10;

        json.allowSleep = "true";
        expect(Game.Formats.isPhysics(json)).toBe(false);
        json.allowSleep = true;

        json.frictionGravity = JSON.stringify({});
        expect(Game.Formats.isPhysics(json)).toBe(false);

        json.frictionGravity = {
            x: "10",
            y: 9,
            z: 10
        }
        expect(Game.Formats.isPhysics(json)).toBe(false);

        json.frictionGravity.x = 10;
        expect(Game.Formats.isPhysics(json)).toBe(true);

        delete json.frictionGravity.x;
        expect(Game.Formats.isPhysics(json)).toBe(false);
    });
});