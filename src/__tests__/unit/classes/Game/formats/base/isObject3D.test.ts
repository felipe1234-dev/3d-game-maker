import { Game } from "@local/classes";

describe("Game.Formats.isObject3D", () => {
    it("should return true to all objects in the list", () => {
        for (const type of Game.Libs.objects3D) {
            if (type === "Scene") continue;

            const object = new Game[type]();
            const format = object.toJSON();

            console.log(type, format);

            expect(Game.Formats.isObject3D(format)).toBe(true);
        }
    });
});