import { Game } from "@local/classes";

describe("Testing material formats", () => {
    test("All material formats must implement the base format: Material", () => {
        for (const type of Game.Libs.materials) {
            const material = new Game[type]();
            const format = material.toJSON();

            expect(Game.Formats.isMaterial(format)).toBe(true);
        }
    });

    test("The returned value from the toJSON method must implement the corresponding format", () => {
        for (const type of Game.Libs.materials) {
            const material = new Game[type]();
            const format = material.toJSON();

            expect(Game.Formats[`is${type}`](format)).toBe(true);
        }
    });
});