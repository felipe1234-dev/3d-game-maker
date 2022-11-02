import { Game } from "@local/classes";

describe("Game.Formats.isMesh", () => {
    it("should return true to the result of new Game.Mesh().toJSON()", () => {
        const mesh = new Game.Mesh();
        const format = mesh.toJSON();

        expect(Game.Formats.isMesh(format)).toBe(true);
    });
});