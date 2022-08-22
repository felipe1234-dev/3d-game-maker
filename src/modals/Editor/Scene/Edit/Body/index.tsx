import { useContext, useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";
import { GameContext } from "@local/contexts";
import { t } from "@local/i18n";

import Background from "./Background";
import Environment from "./Environment";
import Fog from "./Fog";

function Body() {
    const game = useContext(GameContext);
    const [sceneName, setSceneName] = useState<string>("");

    useEffect(() => {
        if (!game) return;
        setSceneName(game.currentScene.name);
    }, [game, game?.currentScene]);

    useEffect(() => {
        if (!game) return;
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
        </div>
    );
}

export default Body;