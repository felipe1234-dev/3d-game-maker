import React, { createContext, useContext, useState } from "react";

import { Game } from "@local/classes";

import { Game as GameMetadata } from "@local/api/models";

interface GameValue {
    setGame: (game: Game.Core | undefined) => void;
    game?: Game.Core;
    metadata?: Partial<GameMetadata>;
    updateMetadata: (updates: Partial<GameMetadata>) => void;
}

const GameContext = createContext<GameValue | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game.Core>();
    const [metadata, setMetadata] = useState<Partial<GameMetadata>>();

    const updateMetadata = (
        updates: Partial<GameMetadata>
    ) => {
        setMetadata(
            prev => ({
                ...prev,
                ...updates
            })
        );
    };

    return (
        <GameContext.Provider
            value={{
                setGame,
                game,
                metadata,
                updateMetadata
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
}

function useGame() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return ({
        game: context.game,
        setGame: context.setGame
    });
}

function useMetadata() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useMetadata must be used within a GameProvider");
    }

    return ({
        metadata: context.metadata,
        updateMetadata: context.updateMetadata,
    });
}

export { useGame, useMetadata, GameProvider, GameContext };
export type { GameValue };