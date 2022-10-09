/* describe("Game.Utils.scene.toJSON()", () => {
    const object = new Game.Mesh();
    const gray = "#444";

    const createDefaultScene = () => {
        const scene = new Game.Scene({
            name: "Test Scene",
            background: new THREE.Color(gray),
            fog: new THREE.Fog(gray, 5, 0),
            children: [object],
        });
        return scene;
    };

    test("should have the same ID after being formatted", () => {
        const scene = createDefaultScene();
        const format = scene.toJSON();

        expect(format.object.id).toBe(scene.id);
    });

    test("should have the same uuid after being formatted", () => {
        const scene = createDefaultScene();
        const format = scene.toJSON();

        expect(format.object.uuid).toBe(scene.uuid);
    });

    test("should have the same name after being formatted", () => {
        const scene = createDefaultScene();
        const format = scene.toJSON();

        expect(format.object.name).toBe(scene.name);
    });

    test("format.object.children should always be an array even if there are no children", () => {
        const scene = createDefaultScene();
        scene.remove(object);
        const format = scene.toJSON();

        expect(format.object.children).toBeDefined();
        expect(format.object.children).toEqual([]);
    });
    
    test("no child objects should be lost", () => {
        const scene = createDefaultScene();
        const format = scene.toJSON();

        expect(format.object.children.length).toBe(scene.children.length);
    });

    test("no bodies should be lost", () => {
        const scene = createDefaultScene();
        const format = scene.toJSON();

        expect(format.bodies?.length).toBe(scene.physics.bodies.length);
    });
}); */

export { };