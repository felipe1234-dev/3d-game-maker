import { useEffect } from "react";
import { Box } from "@mui/material";
import {
    Routes as Switch,
    Route,
    useLocation,
    Location,
} from "react-router-dom";
import { AlertMessage, PageLoader, Composer } from "@local/components";
import { useAlert, useLoader } from "@local/contexts";
import { isRouteState } from "@local/functions";

import routes from "@local/consts/routes";

function Root() {
    const loader = useLoader();
    const alert = useAlert();

    const pageLocation = useLocation();
    const { pathname: pathNow, state } = pageLocation;

    let backgroundLocation: Location | null = null;
    let enablePageLoader: boolean = true;

    if (isRouteState(state)) {
        backgroundLocation = state.background ?? null;
        enablePageLoader = state.useLoader ?? false;
    }

    useEffect(() => {
        if (enablePageLoader) {
            loader.show();
        } else {
            loader.hide();
        }
    }, [pathNow]);

    useEffect(() => {
        setTimeout(() => {
            loader.hide();
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
                    open={!!alert.message && !!alert.severity}
                    type={alert.severity ?? undefined}
                    duration={6000}
                    message={alert.message}
                    onClose={() => {
                        alert.setMessage(null);
                        alert.setSeverity(null);
                    }}
                />
            </Box>

            <PageLoader hidden={!loader.visible} />
        </>
    );
}

export default Root;