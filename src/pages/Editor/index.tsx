import { useEffect } from "react";
import { Box } from "@mui/material";
import {
    useLocation,
    useParams,
    useNavigate
} from "react-router-dom";
import * as THREE from "three";

import { auth, games } from "@local/api";
import { Game as GameMetadata } from "@local/api/models";
import { parseGameJSON } from "@local/api/functions";
import { Game, Editor } from "@local/classes";
import {
    useGame,
    useMetadata,
    useEditor,
    useAlert
} from "@local/contexts";
import { Alert } from "@local/interfaces";
import { getLang } from "@local/i18n";

import Menubar from "./Menubar";
import Viewport from "./Viewport";
import Toolbar from "./Toolbar";

import "@local/styles/pages/EditorPage.scss";

function EditorPage() {
    const alert = useAlert();
    const { setEditor } = useEditor();
    const { setGame } = useGame();
    const { updateMetadata } = useMetadata();
    const { gameUid } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const lang = getLang();

    useEffect(() => {
        (async () => {
            try {
                const user = await auth.currentUser();
                if (!user) {
                    return navigate(`/${lang}/auth`, {
                        state: {
                            useLoader: true,
                        }
                    });
                }

                let gameMetadata: GameMetadata;

                if (gameUid === "new-game" || !gameUid) {
                    return navigate("snippets", {
                        state: {
                            background: location,
                            useLoader: false,
                        }
                    });
                } else {
                    const game = await games.byUid(gameUid);

                    if (!game) {
                        throw {
                            severity: "error",
                            message: "Game not found",
                        };
                    }

                    gameMetadata = game;
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

                const gameCore = Game.Core.fromJSON(format);
                setGame(gameCore);

                const editorCore = new Editor.Core(gameCore);
                setEditor(editorCore);
            } catch (error) {
                const err = error as Alert;
                alert.setSeverity(err.severity);
                alert.setMessage(err.message);
            }
        })();
    }, [gameUid]);

    return (
        <Box component="div" className="Editor">
            <Menubar />
            <Viewport />
            <Toolbar />
        </Box>
    );
}

export default EditorPage;