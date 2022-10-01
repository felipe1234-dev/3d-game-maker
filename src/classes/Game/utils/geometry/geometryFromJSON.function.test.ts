import * as THREE from "three";
import { Game } from "@local/classes";

describe("> Game.Utils.geometry.fromJSON()", () => {
    const validClassNames: string[] = [];
    for (const name in THREE) {
        if (/geometry/i.test(name)) validClassNames.push(name);
    }

    test("geometry must have the same parameters as the original after being unconverted", () => {
        for (const name of Game.Libs.geometries) {
            const original = new THREE[name]();
            const format = Game.Utils.geometry.toJSON(original);
            const unconverted = Game.Utils.geometry.fromJSON(format);

            for (const [param, value] of Object.entries(original.parameters)) {
                expect((unconverted as any).parameters[param]).toBe(value);
            }
        }
    });

    test("uuid and name must be kept the same after being unconverted", () => {
        const original = new THREE.BoxGeometry();
        const format = Game.Utils.geometry.toJSON(original);
        const unconverted = Game.Utils.geometry.fromJSON(format);

        expect(unconverted.uuid).toBe(original.uuid);
        expect(unconverted.name).toBe(original.name);
    });

    test("geometry.index must be the same after being unconverted", () => {
        const geometry = new THREE.BoxGeometry();
        const array = [0, 1, 2, 0, 9, 7];
        geometry.setIndex(
            new THREE.BufferAttribute(new Float32Array(array), 3, true)
        );

        const format = Game.Utils.geometry.toJSON(geometry);
        const result = Game.Utils.geometry.fromJSON(format);

        expect(result.index).toEqual(geometry.index);
    });

    test("geometry.attributes must be kept the same after being unconverted", () => {
        const geometry = new THREE.BoxGeometry();

        const vertices = new Float32Array([
            -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

            1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        ]);

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
        );

        const format = Game.Utils.geometry.toJSON(geometry);
        const result = Game.Utils.geometry.fromJSON(format);

        expect(result.attributes).toEqual(geometry.attributes);
    });
});