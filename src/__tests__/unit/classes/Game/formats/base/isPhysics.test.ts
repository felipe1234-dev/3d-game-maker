import { Game } from "@local/classes";

describe("Game.Formats.isPhysics", () => {
    it("should return true to the result of new Game.Physics().toJSON()", () => {
        const physics = new Game.Physics();
        const format = physics.toJSON();

        expect(Game.Formats.isPhysics(format)).toBe(true);
    });
});