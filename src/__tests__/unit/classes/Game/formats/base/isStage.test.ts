import { Game } from "@local/classes";

describe("Game.Formats.isStage", () => {
    it("should return true to the result of new Game.Stage().toJSON()", () => {
        const stage = new Game.Stage();
        const format = stage.toJSON();

        expect(Game.Formats.isStage(format)).toBe(true);
    });
});