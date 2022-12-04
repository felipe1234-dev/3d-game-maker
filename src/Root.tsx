import { useEffect } from "react";
import {
    Routes,
    Route,
    useLocation,
    Location,
} from "react-router-dom";
import { 
    AlertMessage, 
    PageLoader, 
    Composer 
} from "@local/components";
import { useAlert, useLoader } from "@local/contexts";
import { isRouteState } from "@local/functions";
import { useBgLocation } from "@local/hooks";

import routes from "@local/consts/routes";

function Root() {
    const loader = useLoader();
    const alert = useAlert();

    const pageLocation = useLocation();
    const { pathname: pathNow } = pageLocation;
    const { 
        background: backgroundLocation, 
        useLoader: usePageLoader 
    } = useBgLocation();


    useEffect(() => {
        if (usePageLoader) {
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
            <main>
                <Routes location={backgroundLocation || pageLocation}>
                    {routes.pages.map((page, i) => (
                        <Route
                            key={i}
                            path={page.path}
                            element={
                                <Composer
                                    components={[
                                        ...page.wrappers,
                                        page.Element,
                                    ]}
                                />
                            }
                        />
                    ))}
                </Routes>

                {backgroundLocation && (
                    <Routes>
                        {routes.modals.map((modal, i) => (
                            <Route
                                key={i}
                                path={modal.path}
                                element={
                                    <Composer
                                        components={[
                                            ...modal.wrappers,
                                            modal.Element,
                                        ]}
                                    />
                                }
                            />
                        ))}
                    </Routes>
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
            </main>

            <PageLoader hidden={!loader.visible} />
        </>
    );
}

export default Root;