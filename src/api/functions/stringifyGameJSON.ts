import { Game as GameFormat } from "@local/classes/Game/formats/base";

function stringifyGameJSON(json: GameFormat): string {
    return JSON.stringify(json, (key: string, value: any) => {
        if (value === Infinity) {
            return "Infinity";
        }

        return value;
    });
}

export default stringifyGameJSON;