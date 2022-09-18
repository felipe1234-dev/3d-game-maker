import { createContext, useContext, useEffect, useState } from "react";
import { Utils } from "@local/classes";

const RendererContext = createContext<Utils.Renderer | undefined>(undefined);

function RendererProvider(props: { children: React.ReactNode }) {
    const [renderer, setRenderer] = useState<Utils.Renderer>();

    return (
        <RendererContext.Provider value={renderer}>
            {props.children}
        </RendererContext.Provider>
    );
}

function useRenderer() {
    const context = useContext(RendererContext);

    if (!context) {
        throw new Error("useRenderer must be used within a RendererProvider");
    }

    return context;
}

export { RendererProvider, useRenderer };