// Libs
import React from "react";
import {
    Routes as Switch,
    Route,
    useLocation,
    Location
} from "react-router-dom";
import { Box } from "@mui/material";

// Local components
import { AlertMessage } from "@local/components";

// Local contexts
import { AlertContext } from "@local/contexts";

// Local functions
import { isRouteState } from "@local/functions";

// Local pages
import { EditorPage } from "@local/pages";

// Local modals
import { EditObjectModal as EditObject } from "@local/modals";

// Local styles
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
        }, 8000);
    });
    
    return (
        <>
            <Box component="main" sx={{ display: pageIsLoading ? "none" : "block" }}>
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
        </>
    );
}

export default App;