import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { useLocation } from "react-router-dom";

import { Game } from "@local/classes";
import { Game as GameFormat } from "@local/classes/Game/formats";
import { useAlert } from "@local/contexts";
import { Alert, RouteState } from "@local/interfaces";
import { isRouteState } from "@local/functions";
import { games } from "@local/api";

function replacer(key: string, value: any): any {
    if (value === "Infinity") {
        return Infinity;
    }

    return value;
}

const GameContext = createContext<Game.Core | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game.Core>();

    const alert = useAlert();
    const { state } = useLocation();

    let routeState: RouteState = {};
    if (isRouteState(state)) {
        routeState = state;
    }

    useEffect(() => {
        (async () => {
            try {
                const { gameUrl } = routeState;

                if (gameUrl) {
                    const data = await fetch(gameUrl);
                    const json = await data.text();
                    const format = JSON.parse(json, replacer) as GameFormat;
                    const core = Game.Core.fromJSON(format);

                    setGame(core);
                } else {
                    const snippets = await games.list({
                        where: [
                            ["snippet", "==", true]
                        ],
                        orderBy: [
                            ["createdAt", "desc"]
                        ],
                    });

                    const gameUrl = snippets[0].url;
                    const data = await fetch(gameUrl);
                    const json = await data.text();
                    const format = JSON.parse(json, replacer) as GameFormat;
                    const core = Game.Core.fromJSON(format);

                    setGame(core);
                }
            } catch (error) {
                const err = error as Alert;
                alert.setSeverity(err.severity);
                alert.setMessage(err.message);
            }
        })();
    }, []);

    if (!game) {
        return <></>;
    }

    return (
        <GameContext.Provider value={game}>
            {props.children}
        </GameContext.Provider>
    );
}

function useGame() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return context;
}

export { useGame, GameProvider, GameContext };