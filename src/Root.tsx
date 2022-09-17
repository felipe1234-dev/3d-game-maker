import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
    Routes as Switch,
    Route,
    useLocation,
    Location,
} from "react-router-dom";
import { AlertMessage, PageLoader, Composer } from "@local/components";
import { AlertContext } from "@local/contexts";
import { isRouteState } from "@local/functions";

import routes from "@local/consts/routes";

function Root() {
    const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);
    const { message, setMessage, severity, setSeverity } =
        useContext(AlertContext);

    const pageLocation = useLocation();
    const { pathname: pathNow, state } = pageLocation;

    let backgroundLocation: Location | null = null;
    let enablePageLoader: boolean = true;

    if (isRouteState(state)) {
        backgroundLocation = state.background ?? null;
        enablePageLoader = state.useLoader ?? false;
    }

    useEffect(() => {
        setPageIsLoading(enablePageLoader);
    }, [pathNow]);

    useEffect(() => {
        setTimeout(() => {
            setPageIsLoading(false);
        }, 3000);
    });

    return (
        <>
            <Box component="main">
                <Switch location={backgroundLocation ?? pageLocation}>
                    {routes.pages.map((item, i) => (
                        <Route
                            key={i}
                            path={`/:lang${item.path}`}
                            element={
                                <Composer
                                    components={[
                                        ...item.wrappers,
                                        item.Element,
                                    ]}
                                />
                            }
                        />
                    ))}
                </Switch>

                {backgroundLocation && (
                    <Switch>
                        {routes.modals.map((item, i) => (
                            <Route
                                key={i}
                                path={`/:lang${item.path}`}
                                element={
                                    <Composer
                                        components={[
                                            ...item.wrappers,
                                            item.Element,
                                        ]}
                                    />
                                }
                            />
                        ))}
                    </Switch>
                )}

                <AlertMessage
                    open={!!message && !!severity}
                    type={severity ?? undefined}
                    duration={6000}
                    message={message}
                    onClose={() => {
                        setMessage(null);
                        setSeverity(null);
                    }}
                />
            </Box>

            <PageLoader hidden={!pageIsLoading} />
        </>
    );
}

export default Root;