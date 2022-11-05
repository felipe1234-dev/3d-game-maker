import { Game } from "@local/classes";

describe("Testing geometry classes", () => {
    test("All the geometries must implement the base geometry model", () => {
        for (const type of Game.Libs.geometries) {
            const geometry = new Game[type]();

            expect(Game.isGeometry(geometry)).toBe(true);
        }
    });
});