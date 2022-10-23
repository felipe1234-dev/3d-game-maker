import { validateURL } from "@local/functions";
import { RouteState } from "@local/interfaces";
import isLocation from "./isLocation";

function isRouteState(obj: any): obj is RouteState {
    return (
        obj && obj instanceof Object &&
        (obj.from === undefined || isLocation(obj.from)) &&
        (obj.background === undefined || isLocation(obj.background)) &&
        (obj.useLoader === undefined || typeof obj.useLoader === "boolean") &&
        (
            obj.gameUrl === undefined ||
            typeof obj.gameUrl === "string" && validateURL(obj.gameUrl)
        )
    );
}

export default isRouteState;