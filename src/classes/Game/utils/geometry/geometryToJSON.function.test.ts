import * as THREE from "three";
import { Game } from "@local/classes";

describe("Game.Utils.geometry.toJSON()", () => {
    const validClassNames: string[] = [];
    for (const name in THREE) {
        if (/geometry/i.test(name)) validClassNames.push(name);
    }

    test("format.type must be a valid geometry class name", () => {
        const formatTypes: string[] = [];
        for (const name of Game.Libs.geometries) {
            const geometry = new THREE[name]();
            const format = Game.Utils.geometry.toJSON(geometry);

            formatTypes.push(format.type);
        }

        const allFormatTypesAreValid = () =>
            formatTypes.every(type => validClassNames.includes(type));

        expect(allFormatTypesAreValid()).toBe(true);
    });

    test("format must have the same parameters as the original geometry", () => {
        for (const name of Game.Libs.geometries) {
            let geometry = new THREE[name]();
            const format = Game.Utils.geometry.toJSON(geometry);

            for (const [param, value] of Object.entries(geometry.parameters)) {
                expect((format as any)[param]).toBe(value);
            }
        }
    });

    test("format.name must not be undefined if geometry.name is an empty string", () => {
        const geometry = new THREE.BoxGeometry();
        const format1 = Game.Utils.geometry.toJSON(geometry);

        expect(format1.name).toBeDefined();

        geometry.name = "test";
        const format2 = Game.Utils.geometry.toJSON(geometry);

        expect(format2.name).toBe(geometry.name);
    });

    test("format.uuid must be equal to geometry.uuid", () => {
        const geometry = new THREE.BoxGeometry();
        const format = Game.Utils.geometry.toJSON(geometry);

        expect(format.uuid).toBe(geometry.uuid);
    });

    test("format must have data property", () => {
        for (const name of Game.Libs.geometries) {
            let geometry = new THREE[name]();
            const format = Game.Utils.geometry.toJSON(geometry);

            expect(format.data).toBeDefined();
        }
    });
});