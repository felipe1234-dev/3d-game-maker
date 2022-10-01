import * as THREE from "three";
import { Game } from "@local/classes";

function bufferAttributeFromJSON(
    attribute: Game.Formats.BufferAttribute
): THREE.BufferAttribute {
    const bufferAttribute = new THREE.BufferAttribute(
        Game.Utils.getTypedArray(attribute.type, attribute.array),
        attribute.itemSize,
        attribute.normalized
    );

    bufferAttribute.name = attribute.name || "";

    if (attribute.usage !== undefined) bufferAttribute.usage = attribute.usage;
    if (attribute.updateRange)
        bufferAttribute.updateRange = attribute.updateRange;

    return bufferAttribute;
}

export default bufferAttributeFromJSON;