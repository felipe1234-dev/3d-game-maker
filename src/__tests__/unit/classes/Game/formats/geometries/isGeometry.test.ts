import { Game } from "@local/classes";

describe("Game.Formats.isGeometry", () => {
    it("should return true to all geometries in the list", () => {
        for (const type of Game.Libs.geometries) {
            if (
                type === "EdgesGeometry" ||
                type === "WireframeGeometry"
            ) {
                const box = new Game.BoxGeometry();
                const geometry = new Game[type](box);
                const format = geometry.toJSON();

                expect(Game.Formats.isGeometry(format)).toBe(true);
            } else {
                const geometry = new Game[type]();
                const format = geometry.toJSON();

                expect(Game.Formats.isGeometry(format)).toBe(true);
            }
        }
    });
});