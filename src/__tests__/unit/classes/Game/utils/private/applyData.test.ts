import { Game } from "@local/classes";
import { applyData } from "@local/classes/Game/utils/private";
import * as THREE from "three";

describe("Testing private utils", () => {
    test("applyData.function", () => {
        const geometry = new Game.BoxGeometry();
        const vertices = new Float32Array([
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,

            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, -1.0, 1.0
        ]);
        geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute("scale", new THREE.BufferAttribute(vertices, 1.0));
        geometry.setIndex([0, 1, 2, 3, 4, 5, 6]);
        const json = geometry.toJSON();

        const cmpGeometry = new Game.BoxGeometry();
        applyData(cmpGeometry, json.data);

        expect(cmpGeometry.attributes.position).toEqual(cmpGeometry.attributes.position);
        expect(cmpGeometry.attributes.scale).toEqual(cmpGeometry.attributes.scale);
        expect(cmpGeometry.index).toEqual(geometry.index);
        expect(cmpGeometry.groups).toEqual(geometry.groups);
    });
});