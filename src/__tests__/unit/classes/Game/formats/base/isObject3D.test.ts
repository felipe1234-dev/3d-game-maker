import { Game } from "@local/classes";

describe("Game.Formats.isObject3D", () => {
    test("All objects should implement Game.Formats.Object3D", () => {
        for (const type of Game.Libs.objects3D) {
            if (type === "Scene") continue;

            const object = new Game[type]();
            const format = object.toJSON();

            expect(Game.Formats.isObject3D(format)).toBe(true);
        }
    });
});