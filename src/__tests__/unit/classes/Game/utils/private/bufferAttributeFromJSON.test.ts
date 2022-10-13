import { Game } from "@local/classes";
import { bufferAttributeFromJSON } from "@local/classes/Game/utils/private";
import * as THREE from "three";

describe("bufferAttributeFromJSON.function", () => {
    it("should return an instance with the same properties as the other instance generated with the JSON", () => {
        const bufferAttribute = new THREE.BufferAttribute(
            new Uint16Array([
                -1.0, -1.0, 1.0,
                1.0, -1.0, 1.0,
                1.0, 1.0, 1.0,

                1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0,
                -1.0, -1.0, 1.0
            ]),
            3,
            true
        );
        bufferAttribute.name = "test";
        bufferAttribute.updateRange.offset = 2;
        bufferAttribute.updateRange.count = 10;

        const json: Game.Formats.BufferAttribute = bufferAttribute.toJSON();
        const cmpAttribute = bufferAttributeFromJSON(json);

        expect(cmpAttribute.name).toBe(bufferAttribute.name);
        expect(cmpAttribute.array).toEqual(bufferAttribute.array);
        expect(cmpAttribute.itemSize).toBe(bufferAttribute.itemSize);
        expect(cmpAttribute.usage).toBe(bufferAttribute.usage);
        expect(cmpAttribute.normalized).toBe(bufferAttribute.normalized);
        expect(cmpAttribute.updateRange).toEqual(bufferAttribute.updateRange);
    });
});