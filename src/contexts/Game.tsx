import React, { createContext, useEffect, useState } from "react";
import * as THREE from "three";
import { Game } from "@local/classes";
import { useLocation } from "react-router-dom";

const GameContext = createContext<Game.Core | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game.Core>();

    useEffect(() => {
        const obj = new Game.Core({
            name: "",
            description: ""
        });
        setGame(obj);
    }, []);
    
    return (
        <GameContext.Provider value={game}>
            {props.children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };