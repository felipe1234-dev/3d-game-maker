import { RouteState } from "@local/interfaces";
import isLocation from "./isLocation";

function isRouteState(object: any): object is RouteState {
    switch(true) {
        case !object || typeof object !== "object":
        case "from" in object && !isLocation(object.from):
        case "background" in object && !isLocation(object.background):
        case "useLoader" in object && typeof object.useLoader !== "boolean":
        case !("from" in object || "background" in object || "useLoader" in object):
            return false;
        default: 
            return true;
    }
}

export default isRouteState;