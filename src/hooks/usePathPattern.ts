import { matchRoutes, useLocation } from "react-router-dom"
import routes from "@local/consts/routes";

function usePathPattern(scope: "pages" | "modals" = "pages") {
    const location = useLocation();
    const matches = matchRoutes(
        routes[scope].map(({ path }) => ({ path })),
        location
    );

    if (!matches) return undefined;

    const [{ route }] = matches;

    return route.path;
}

export default usePathPattern;