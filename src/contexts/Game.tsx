import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import * as THREE from "three";

import { Game } from "@local/classes";

import { auth, games } from "@local/api";
import { Game as GameMetadata } from "@local/api/models";
import { parseGameJSON } from "@local/api/functions";

import { useAlert } from "@local/contexts";
import { Alert, RouteState } from "@local/interfaces";
import { isRouteState } from "@local/functions";
import { getLang } from "@local/i18n";

interface GameValue {
    game?: Game.Core;
    metadata?: Partial<GameMetadata>;
    updateMetadata: (updates: Partial<GameMetadata>) => void;
}

const GameContext = createContext<GameValue | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game.Core>();
    const [metadata, setMetadata] = useState<Partial<GameMetadata>>();

    const alert = useAlert();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const lang = getLang();
    const state = location.state;

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

    useEffect(() => {
        (async () => {
            const user = await auth.currentUser();
            if (!user) {
                navigate(`/${lang}/auth`, {
                    state: {
                        useLoader: true,
                    }
                });

                return;
            }

            const routeState: RouteState = isRouteState(state) ? state : {};

            try {
                let gameMetadata: GameMetadata;

                if (params.gameUid) {
                    const game = await games.byUid(params.gameUid);

                    if (!game) {
                        throw {
                            severity: "error",
                            message: "Game not found",
                        };
                    }

                    gameMetadata = game;
                } else if (routeState.game) {
                    const game = routeState.game;
                    gameMetadata = game;
                } else {
                    const snippets = await games.list({
                        where: [
                            ["snippet", "==", true]
                        ],
                        orderBy: [
                            ["createdAt", "desc"]
                        ],
                    });
                    const snippet = snippets[0];

                    gameMetadata = snippet;
                }

                const gameUrl = gameMetadata.url;
                const isSnippet = gameMetadata.snippet;

                const data = await fetch(gameUrl);
                const json = await data.text();
                const format = parseGameJSON(json);

                if (isSnippet) {
                    const oldUid = gameMetadata.uid;
                    const newUid = THREE.MathUtils.generateUUID();

                    gameMetadata.tags = JSON.parse(
                        JSON.stringify(gameMetadata.tags).replace(oldUid, newUid)
                    );

                    format.uuid = newUid;
                    gameMetadata.uid = newUid;
                }

                gameMetadata.snippet = false;

                updateMetadata({ ...gameMetadata });

                const core = Game.Core.fromJSON(format);
                setGame(core);
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
        <GameContext.Provider
            value={{
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

    if (!context || !context.game) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return context.game;
}

function useMetadata() {
    const context = useContext(GameContext);

    if (!context || !context.metadata) {
        throw new Error("useMetadata must be used within a GameProvider");
    }

    return ({
        metadata: context.metadata,
        updateMetadata: context.updateMetadata,
    });
}

export { useGame, useMetadata, GameProvider, GameContext };
export type { GameValue };