import { Game } from "@local/classes";

describe("Testing material classes", () => {
    test("All the materials must implement the base material model", () => {
        for (const type of Game.Libs.materials) {
            const material = new Game[type]();

            expect(Game.isMaterial(material)).toBe(true);
        }
    });
});