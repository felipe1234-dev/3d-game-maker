import { Game } from "@local/classes";

describe("Game.Formats.isLight", () => {
    it("should return true to all light objects in the list", () => {
        for (const type of Game.Libs.lights) {
            const light = new Game[type]();
            const format = light.toJSON();

            expect(Game.Formats.isLight(format)).toBe(true);
        }
    });
});