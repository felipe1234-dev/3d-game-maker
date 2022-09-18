import { useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";

import { useGame } from "@local/contexts";
import { t } from "@local/i18n";

import Background from "./Background";
import Environment from "./Environment";
import Fog from "./Fog";
import Physics from "./Physics";

function Body() {
    const game = useGame();
    const [sceneName, setSceneName] = useState<string>("");

    useEffect(() => {
        if (!game.currentScene) return;
        setSceneName(game.currentScene.name);
    }, [game, game.currentScene]);

    useEffect(() => {
        if (!game.currentScene) return;
        game.currentScene.name = sceneName;
    }, [sceneName]);

    return (
        <div style={{ paddingTop: 15 }}>
            <TextField
                label={t("Scene name")}
                onChange={evt => setSceneName(evt.target.value)}
                value={sceneName}
            />
            <Divider />
            <Background />
            <Divider />
            <Environment />
            <Divider />
            <Fog />
            <Divider />
            <Physics />
        </div>
    );
}

export default Body;