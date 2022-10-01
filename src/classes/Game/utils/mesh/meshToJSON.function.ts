import { Game } from "@local/classes";

function meshToJSON(
    mesh: Game.Mesh,
    meta?: Required<
        Pick<
            Game.Formats.Meta,
            "geometries" | "materials" | "textures" | "images" | "bodies"
        >
    >
): Game.Formats.Mesh {
    const json = mesh.toJSON(meta);
    const isRootObject = !meta;

    if (isRootObject && mesh.body) {
        json.bodies = [];
        json.bodies.push(Game.Utils.body.toJSON(mesh.body));
    } else if (!isRootObject && mesh.body) {
        if (!meta.bodies) meta.bodies = {};
        meta.bodies[mesh.body.uuid] = Game.Utils.body.toJSON(mesh.body);
    }

    if (mesh.body) json.object.body = mesh.body.uuid;

    return json;
}

export default meshToJSON;