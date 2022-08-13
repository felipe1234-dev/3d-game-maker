import React from "react";
import {
    Routes as Switch,
    Route,
    useLocation,
    Location
} from "react-router-dom";
import { Box } from "@mui/material";
import { 
    AlertMessage, 
    PageLoader,
    Composer
} from "@local/components";
import { AlertContext } from "@local/contexts";
import { isRouteState } from "@local/functions";
import { I18nProvider, AlertProvider } from "@local/contexts";
import { routes } from "@local/consts";

import "./styles/reset.css";
import "./styles/base.scss";

function App() {
    const [pageIsLoading, setPageIsLoading] = React.useState<boolean>(true);
    const {
        message,
        setMessage,
        severity,
        setSeverity
    } = React.useContext(AlertContext);
    
    const pageLocation = useLocation();
    const { pathname: pathNow, state } = pageLocation;
    
    let backgroundLocation: Location | null = null;
    let enablePageLoader: boolean = true;
    
    if (isRouteState(state)) {
        backgroundLocation = state.background ?? null;
        enablePageLoader = state.useLoader ?? false;
    }
    
    React.useEffect(() => {
        setPageIsLoading(enablePageLoader);
    }, [pathNow]);
    
    React.useEffect(() => {
        setTimeout(() => {
            setPageIsLoading(false);
        }, 3000);
    });

    const appProviders = [
        I18nProvider,
        AlertProvider
    ];
    
    return (
        <>
            <Box component="main">
                <Switch location={backgroundLocation ?? pageLocation}>
                    {routes.pages.map((item, i) => (
                        <Route
                            key={i}
                            path={`/:lang${item.path}`}
                            element={(
                                <Composer components={[
                                    ...appProviders,
                                    ...item.wrappers,
                                    item.Element
                                ]} />
                            )}
                        />
                    ))}
                </Switch>
                
                {backgroundLocation && (
                    <Switch>
                        {routes.modals.map((item, i) => (
                            <Route
                                key={i}
                                path={`/:lang${item.path}`}
                                element={(
                                    <Composer components={[
                                        ...appProviders,
                                        ...item.wrappers,
                                        item.Element
                                    ]} />
                                )}
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

export default App;