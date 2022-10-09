/* describe("Game.Scene.fromJSON()", () => {
    const gray = "#444";

    test("background color should be kept the same", () => {
        const scene = new Game.Scene();
        scene.background = new THREE.Color(gray);

        const format = scene.toJSON();
        const result = Game.Scene.fromJSON(format);

        const fColor = format.object.background;
        const resBg =
            result.background instanceof THREE.Color
                ? result.background.toArray()
                : undefined;
        const formBg = new THREE.Color(fColor).toArray();
        const origBg = scene.background.toArray();

        expect(fColor).toBeDefined();
        expect(resBg).toBeDefined();

        expect(resBg).toEqual(formBg);
        expect(resBg).toEqual(origBg);
    });
}); */

export { };