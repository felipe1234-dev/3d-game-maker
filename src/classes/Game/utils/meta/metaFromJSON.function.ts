import { Game } from "@local/classes";

function metaFromJSON(json: Game.Formats.Scene): Game.Formats.Meta {
    const meta: Game.Formats.Meta = {};

    for (const geometry of json.geometries || []) {
        if (!meta.geometries) meta.geometries = {};

        meta.geometries[geometry.uuid] = geometry;
    }

    for (const material of json.materials || []) {
        if (!meta.materials) meta.materials = {};

        meta.materials[material.uuid] = material;
    }

    for (const texture of json.textures || []) {
        if (!meta.textures) meta.textures = {};

        meta.textures[texture.uuid] = texture;
    }

    for (const image of json.images || []) {
        if (!meta.images) meta.images = {};

        meta.images[image.uuid] = image;
    }

    for (const shape of json.shapes || []) {
        if (!meta.shapes) meta.shapes = {};

        meta.shapes[shape.uuid] = shape;
    }

    for (const skeleton of json.skeletons || []) {
        if (!meta.skeletons) meta.skeletons = {};

        meta.skeletons[skeleton.uuid] = skeleton;
    }

    for (const body of json.bodies || []) {
        if (!meta.bodies) meta.bodies = {};

        meta.bodies[body.uuid] = body;
    }

    for (const animation of json.animations || []) {
        if (!meta.animations) meta.animations = {};

        meta.animations[animation.uuid] = animation;
    }

    for (const node of json.nodes || []) {
        if (!meta.nodes) meta.nodes = {};

        meta.nodes[node.uuid] = node;
    }

    return meta;
}

export default metaFromJSON;