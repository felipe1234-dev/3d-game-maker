import { Game } from "@local/classes";

describe("Testing light formats", () => {
    test("All light formats must implement the base format: Light", () => {
        for (const type of Game.Libs.lights) {
            const light = new Game[type]();
            const format = light.toJSON();

            expect(Game.Formats.isLight(format)).toBe(true);
        }
    });

    test("The returned value from the toJSON method must implement the corresponding format", () => {
        for (const type of Game.Libs.lights) {
            const light = new Game[type]();
            const format = light.toJSON();

            expect(Game.Formats[`is${type}`](format)).toBe(true);
        }
    });
});