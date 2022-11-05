import { matchRoutes, useLocation } from "react-router-dom"
import routes from "@local/consts/routes";

function usePathPattern(scope: "pages" | "modals" | "all" = "all") {
    const location = useLocation();

    let routeList = [];
    if (scope === "all") {
        routeList.push(
            ...routes.pages,
            ...routes.modals
        );
    } else {
        routeList.push(...routes[scope]);
    }

    const matches = matchRoutes(
        routeList.map(({ path }) => ({ path })),
        location
    );

    if (!matches) return undefined;

    const [{ route }] = matches;

    return route.path;
}

export default usePathPattern;