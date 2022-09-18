import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import { useGame } from "@local/contexts";
import { t } from "@local/i18n";

function Body() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const game = useGame();

    useEffect(() => {
        setName(game.name);
        setDescription(game.description);
    }, [game]);

    useEffect(() => {
        game.name = name;
        game.description = description;
    }, [name, description]);

    return (
        <>
            <TextField
                label={t("Name")}
                variant="outlined"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    setName(evt.target.value);
                }}
                value={name}
                sx={{ mb: 2 }}
            />
            <TextField
                label={t("Description")}
                variant="outlined"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    setDescription(evt.target.value);
                }}
                value={description}
                multiline
                minRows={4}
            />
        </>
    );
}

export default Body;