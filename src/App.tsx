import React from "react";
import {
    Routes as Switch,
    Route,
    useLocation,
    Location
} from "react-router-dom";
import { Box } from "@mui/material";
import { AlertMessage, PageLoader } from "@local/components";
import { AlertContext } from "@local/contexts";
import { isRouteState } from "@local/functions";
import { EditorPage } from "@local/pages";
import { 
    EditObjectModal as EditObject,
    EditSceneModal as EditScene
} from "@local/modals";

import "./styles/reset.css";
import "./styles/base.css";

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
    
    return (
        <>
            <Box component="main">
                <Switch location={backgroundLocation ?? pageLocation}>
                    <Route
                        path="/editor"
                        element={(
                            <EditorPage />
                        )}
                    />
                </Switch>
                
                {backgroundLocation && (
                    <Switch>
                        <Route 
                            path="/editor/object/"
                            element={(
                                <EditObject />
                            )}
                        />
                        <Route 
                            path="/editor/scene/"
                            element={(
                                <EditScene />
                            )}
                        />
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