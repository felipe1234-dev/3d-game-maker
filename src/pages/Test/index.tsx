import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { Game } from "@local/classes";
import { getLang } from "@local/i18n";
import { auth, games } from "@local/api";
import { useLoader, useGame, useMetadata, useAlert } from "@local/contexts";
import { parseGameJSON } from "@local/api/functions";
import { Alert } from "@local/interfaces";

import Viewport from "./Viewport";

import "@local/styles/pages/TestPage.scss";

function TestPage() {
    const alert = useAlert();
    const loader = useLoader();
    const { setGame } = useGame();
    const { updateMetadata } = useMetadata();
    const { gameUid } = useParams();
    const navigate = useNavigate();
    const lang = getLang();

    useEffect(() => {
        if (!gameUid) return;

        loader.show();

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

                if (!gameUid) return;

                const game = await games.byUid(gameUid);
                if (!game) {
                    throw {
                        severity: "error",
                        message: "Game not found",
                    };
                }

                const gameUrl = game.url;
                const data = await fetch(gameUrl);
                const json = await data.text();
                const format = parseGameJSON(json);

                updateMetadata({ ...game });

                const gameCore = Game.Core.fromJSON(format);
                setGame(gameCore);

                console.log("Testing", game.uid);
                console.log("Name", game.name);
                console.log("Description", game.description);
                console.log(gameCore);
            } catch (error) {
                const err = error as Alert;
                alert.setSeverity(err.severity);
                alert.setMessage(err.message);
            } finally {
                loader.hide();
            }
        })();
    }, []);

    return (
        <Box component="div" className="TestPage">
            <Viewport />
        </Box>
    );
}

export default TestPage;