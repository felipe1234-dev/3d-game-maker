import { createContext, useContext, useEffect, useState } from "react";
import {
    Location,
    NavigateOptions,
    useLocation,
    useNavigate,
} from "react-router-dom";

interface HistoryValue {
    back: (options?: NavigateOptions) => void;
    forward: (options?: NavigateOptions) => void;
    go: (index: number, options?: NavigateOptions) => void;
}

const HistoryContext = createContext<HistoryValue | undefined>(undefined);

function HistoryProvider(props: { children: React.ReactNode }) {
    const [history, setHistory] = useState<Location[]>([]);
    const [currIndex, setCurrIndex] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        history.push(location);
        setHistory([...history]);
        setCurrIndex(history.length - 1);
    }, [location]);

    const go = (index: number, options?: NavigateOptions) => {
        if (history[index]) {
            const newLocation = history[index];
            navigate(newLocation.pathname, options);
            setCurrIndex(index);
        } else {
            navigate(index, options);
        }
    };

    const back = (options?: NavigateOptions) => {
        const prevIndex = currIndex - 1;

        if (!history[prevIndex]) {
            go(-1, options);
            return;
        }

        go(prevIndex, options);
    };

    const forward = (options?: NavigateOptions) => {
        const nextIndex = currIndex + 1;

        if (!history[nextIndex]) {
            go(1, options);
            return;
        }

        go(nextIndex, options);
    };

    return (
        <HistoryContext.Provider
            value={{
                back,
                forward,
                go,
            }}
        >
            {props.children}
        </HistoryContext.Provider>
    );
}

function useHistory() {
    const context = useContext(HistoryContext);

    if (!context) {
        throw new Error("useHistory must be used within a HistoryProvider");
    }

    return context;
}

export { HistoryProvider, useHistory, HistoryContext };
export type { HistoryValue };