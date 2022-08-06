import { 
    useState, 
    useEffect, 
    useContext
} from "react";
import { 
    Navigate, 
    useLocation,
    Location
} from "react-router-dom";
import * as auth from "@local/api/auth";
import { isRouteState } from "@local/functions";
import { AlertContext, UserContext } from "@local/contexts";
import { Alert } from "@local/interfaces";

interface RequireAuthProps {
    children: JSX.Element
};

function RequireAuth({ children }: RequireAuthProps) {
    const [ready, setReady]     = useState<boolean>(false);
    const [allowed, setAllowed] = useState<boolean>(false);
    const location = useLocation();
    
    const { setSeverity, setMessage } = useContext(AlertContext);
    const { setUser } = useContext(UserContext);
    
    const locationNow = useLocation();
    const { state } = locationNow;
    
    let bgLocation: Location | null = null;
    if (isRouteState(state)) {
        bgLocation = state.background || null;
    }
    
    useEffect(() => {
        setReady(false);

        (async () => {
            try {
                const user = await auth.currentUser();
                setUser(user);
                setAllowed(!!user);
                        
                setReady(true);
            } catch (error) {
                const err = error as Alert;
                setSeverity(err.severity);
                setMessage(err.message);   
            }
        })();
    }, []); 

    if (!ready) {
        return <></>;
    }
    
    if (!allowed) {
        return (
            <Navigate 
                to="/auth" 
                state={{ from: bgLocation || locationNow }} 
                replace 
            />
        );
    }

    return children;
}

export default RequireAuth;
export type { RequireAuthProps };