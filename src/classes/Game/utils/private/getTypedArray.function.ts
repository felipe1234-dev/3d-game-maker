type TypedArray =
    | Float64Array
    | Float32Array
    | Int32Array
    | Int16Array
    | Int8Array
    | Uint32Array
    | Uint16Array
    | Uint8Array
    | Uint8ClampedArray
    | number[];

function getTypedArray(type: string, array: number[]): TypedArray {
    switch (type) {
        case "Float64Array":
            return new Float64Array(array);
        case "Float32Array":
            return new Float32Array(array);

        case "Int32Array":
            return new Int32Array(array);
        case "Int16Array":
            return new Int16Array(array);
        case "Int8Array":
            return new Int8Array(array);

        case "Uint32Array":
            return new Uint32Array(array);
        case "Uint16Array":
            return new Uint16Array(array);
        case "Uint8Array":
            return new Uint8Array(array);

        case "Uint8ClampedArray":
            return new Uint8ClampedArray(array);

        default:
            return array;
    }
}

export default getTypedArray;