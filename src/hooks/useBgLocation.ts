import { useLocation, Location } from "react-router-dom";
import { isRouteState } from "@local/functions";

function useBgLocation() {
    const pageLocation = useLocation();
    const { state } = pageLocation;

    let backgroundLocation: Location | null = null;
    let enablePageLoader: boolean = true;

    if (isRouteState(state)) {
        backgroundLocation = state.background ?? null;
        enablePageLoader = state.useLoader ?? false;
    }

    return {
        background: backgroundLocation,
        useLoader: enablePageLoader
    };
}

export default useBgLocation;