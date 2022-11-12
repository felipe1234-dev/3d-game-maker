import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { auth } from "@local/api";
import { isRouteState } from "@local/functions";
import { useAlert } from "@local/contexts";
import { Alert } from "@local/interfaces";
import { getLang } from "@local/i18n";

interface RequireAuthProps {
    children: JSX.Element;
}

function RequireAuth({ children }: RequireAuthProps) {
    const [ready, setReady] = useState<boolean>(false);
    const [allowed, setAllowed] = useState<boolean>(false);
    const { setSeverity, setMessage } = useAlert();

    const locationNow = useLocation();
    const { state } = locationNow;
    const bgLocation = isRouteState(state) ? state : null;

    useEffect(() => {
        setReady(false);

        (async () => {
            try {
                const user = await auth.currentUser();
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

    const lang = getLang();

    if (!allowed) {
        return (
            <Navigate
                to={`/${lang}/auth`}
                state={{ from: bgLocation || locationNow }}
                replace
            />
        );
    }

    return children;
}

export default RequireAuth;
export type { RequireAuthProps };