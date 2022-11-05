import { Game } from "@local/classes";

describe("Testing camera classes", () => {
    test("All the cameras must implement the base camera model", () => {
        for (const type of Game.Libs.cameras) {
            const camera = new Game[type]();

            expect(Game.isCamera(camera)).toBe(true);
        }
    });
});