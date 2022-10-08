import { Game } from "@local/classes";

/**
 * Converts all JSONs from children and adds them to the object.
 */
function parseObjectChildren(
    object: Game.Object3D,
    json: Game.Formats.Object3D,
    meta?: Game.Formats.Meta
): void {
    for (const childJson of json.object.children || []) {
        let child: Game.Object3D = new Game.BaseObject3D();

        for (const type of Game.Libs.objects3D) {
            if (Game.Formats[`is${type}`](childJson)) {
                // @ts-ignore
                child = Game[type].fromJSON(childJson, meta);
            }
        }

        if (child) object.add(child);
    }
}

export default parseObjectChildren;