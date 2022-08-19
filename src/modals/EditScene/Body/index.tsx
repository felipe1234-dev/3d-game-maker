import { useContext, useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";
import { GameContext, I18nContext } from "@local/contexts";

import Background from "./Background";
import Environment from "./Environment";

function Body() {
    const game = useContext(GameContext);
    const i18n = useContext(I18nContext);
    const scope = "modals.editScene.body.index.";

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
                label={i18n.get(scope + "sceneName")}
                onChange={evt => setSceneName(evt.target.value)}
                value={sceneName}
            />
            <Divider />
            <Background />
            <Divider />
            <Environment />
        </div>
    );
}

export default Body;