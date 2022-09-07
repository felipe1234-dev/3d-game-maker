import { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { t } from "@local/i18n";
import { GameContext } from "@local/contexts";

function Body() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const game = useContext(GameContext);

    useEffect(() => {
        if (!game) {
            return;
        }

        setName(game.name);
        setDescription(game.description);
    }, [game]);

    useEffect(() => {
        if (!game) {
            return;
        }
        
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