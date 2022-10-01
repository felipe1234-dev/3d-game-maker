import { Game } from "@local/classes";
import * as THREE from "three";

function bufferAttributeToJSON(
    attribute: THREE.BufferAttribute
): Game.Formats.BufferAttribute {
    const json = {
        itemSize: attribute.itemSize,
        type: attribute.array.constructor.name,
        array: Array.prototype.slice.call(attribute.array),
        normalized: attribute.normalized,
        name: attribute.name,
        usage: attribute.usage,
        updateRange: {
            offset: attribute.updateRange.offset,
            count: attribute.updateRange.count,
        },
    };

    return json;
}

export default bufferAttributeToJSON;