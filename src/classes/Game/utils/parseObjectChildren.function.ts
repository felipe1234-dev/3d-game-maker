import { Game } from "@local/classes";

/**
 * Converts all child JSONs to objects, and adds them to the passed object.
 */
function parseObjectChildren(
    object: Game.Object3D,
    json: Game.Formats.Object3D
): void {
    for (const objectJson of json.object.children || []) {
        let child: Game.Object3D | undefined = undefined;

        const childJson = { ...json, object: objectJson };

        for (const type of Game.Libs.objects3D) {
            if (Game.Formats[`is${type}`](childJson)) {
                // @ts-ignore
                child = Game[type].fromJSON(childJson);
            }
        }

        if (child) object.add(child);
    }
}

export default parseObjectChildren;