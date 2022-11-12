import React from "react";
import { Box, Divider, TextField } from "@mui/material";

import { useGame } from "@local/contexts";
import { t } from "@local/i18n";
import { useForceUpdate } from "@local/hooks";

import Background from "./Background";
import Environment from "./Environment";
import Fog from "./Fog";
import Physics from "./Physics";

function Body() {
    const { game } = useGame();
    const { forceUpdate } = useForceUpdate();

    const handleSceneNameChange = (
        evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!game || !game.current.scene) return;

        game.current.scene.name = evt.target.value;

        forceUpdate();
    };

    const sceneName = game?.current.scene?.name || "";

    return (
        <Box sx={{ paddingTop: 15 }}>
            <TextField
                label={t("Scene name")}
                onChange={handleSceneNameChange}
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
        </Box>
    );
}

export default Body;