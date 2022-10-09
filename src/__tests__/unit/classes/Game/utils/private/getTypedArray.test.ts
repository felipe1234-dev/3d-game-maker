import { getTypedArray } from "@local/classes/Game/utils/private";

describe("Testing private utils", () => {
    test("getTypedArray.function", () => {
        const array = [0, 3, 4, 1, 17];

        expect(getTypedArray("Float64Array", array)).toEqual(new Float64Array(array));
        expect(getTypedArray("Float32Array", array)).toEqual(new Float32Array(array));

        expect(getTypedArray("Int32Array", array)).toEqual(new Int32Array(array));
        expect(getTypedArray("Int16Array", array)).toEqual(new Int16Array(array));

        expect(getTypedArray("Int8Array", array)).toEqual(new Int8Array(array));

        expect(getTypedArray("Uint32Array", array)).toEqual(new Uint32Array(array));
        expect(getTypedArray("Uint16Array", array)).toEqual(new Uint16Array(array));
        expect(getTypedArray("Uint8Array", array)).toEqual(new Uint8Array(array));

        expect(getTypedArray("Uint8ClampedArray", array)).toEqual(new Uint8ClampedArray(array));
    });
});