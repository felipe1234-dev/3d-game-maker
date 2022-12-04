import { Game } from "@local/classes";

function metaToMetaAsArray(meta: Game.Formats.Meta): Game.Formats.MetaAsArray {
    const metaAsArray: Game.Formats.MetaAsArray = {};

    for (const [key, uuidToJson] of Object.entries(meta)) {
        // @ts-ignore
        metaAsArray[key] = Object.values(uuidToJson);
    }

    return metaAsArray;
}

export default metaToMetaAsArray;