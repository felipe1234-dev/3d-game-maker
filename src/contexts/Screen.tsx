import React from "react";
import * as Game from "@local/classes/Game";

const ScreenContext = React.createContext<{
    setScreen: (newScreen: Game.Screen | null) => void,
    screen: Game.Screen | null
}>({
    setScreen: () => {},
    screen: null
});

function ScreenProvider(props: { children: React.ReactNode }) {
    const [screen, setScreen] = React.useState<Game.Screen | null>(null);
    
    return (
        <ScreenContext.Provider value={{ screen, setScreen }}>
            {props.children}
        </ScreenContext.Provider>
    )
}

export { ScreenContext, ScreenProvider };