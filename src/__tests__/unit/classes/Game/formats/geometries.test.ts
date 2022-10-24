import { Game } from "@local/classes";

describe("Testing geometry formats", () => {
    test("All geometry formats must implement the base format: Geometry", () => {
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

    test("The returned value from the toJSON method must implement the corresponding format", () => {
        for (const type of Game.Libs.geometries) {
            if (
                type === "EdgesGeometry" ||
                type === "WireframeGeometry"
            ) {
                const box = new Game.BoxGeometry();
                const geometry = new Game[type](box);
                const format = geometry.toJSON();

                expect(Game.Formats[`is${type}`](format)).toBe(true);
            } else {
                const geometry = new Game[type]();
                const format = geometry.toJSON();

                expect(Game.Formats[`is${type}`](format)).toBe(true);
            }
        }
    });
});