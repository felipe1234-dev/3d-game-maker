import React, { createContext, useContext, useState } from "react";

interface LoaderValue {
    show: () => void;
    hide: () => void;
    visible: boolean;
}

const LoaderContext = createContext<LoaderValue>({
    show: () => { },
    hide: () => { },
    visible: false
});

function LoaderProvider(props: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <LoaderContext.Provider
            value={{
                show,
                hide,
                visible
            }}
        >
            {props.children}
        </LoaderContext.Provider>
    );
}

function useLoader() {
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("useLoader must be used within a LoaderProvider");
    }

    return context;
}

export { LoaderContext, LoaderProvider, useLoader };
export type { LoaderValue };