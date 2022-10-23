import { Game } from "@local/classes";

describe("Game.Formats.isMaterial", () => {
    it("should return true to all materials in the list", () => {
        for (const type of Game.Libs.materials) {
            const material = new Game[type]();
            const format = material.toJSON();

            expect(Game.Formats.isMaterial(format)).toBe(true);
        }
    });
});