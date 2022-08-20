import React from "react";
import * as THREE from "three";
import { Game } from "@local/classes";
import { useLocation } from "react-router-dom";

const GameContext = React.createContext<Game.Core | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = React.useState<Game.Core>();

    React.useEffect(() => {
        const obj = new Game.Core();
        setGame(obj);
    }, []);
    
    return (
        <GameContext.Provider value={game}>
            {props.children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };