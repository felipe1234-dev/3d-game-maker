import { Game } from "@local/classes";

describe("Game.Formats.isBody", () => {
    it("should return true to the result of new Game.Body().toJSON()", () => {
        const body = new Game.Body();
        const format = body.toJSON();

        expect(Game.Formats.isBody(format)).toBe(true);
    });
});