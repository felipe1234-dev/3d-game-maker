import { Game } from "@local/classes";

describe("Testing camera formats", () => {
    test("The returned value from the toJSON method must implement the corresponding format", () => {
        for (const type of Game.Libs.cameras) {
            const camera = new Game[type]();
            const format = camera.toJSON();

            expect(Game.Formats[`is${type}`](format)).toBe(true);
        }
    });
});