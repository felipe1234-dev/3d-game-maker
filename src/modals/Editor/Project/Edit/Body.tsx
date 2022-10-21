import { TextField } from "@mui/material";

import { useGame } from "@local/contexts";
import { useForceUpdate } from "@local/hooks";
import { t } from "@local/i18n";

function Body() {
    const game = useGame();
    const { forceUpdate } = useForceUpdate();

    const onChangeName = (name: string) => {
        game.name = name;
        forceUpdate();
    };

    const onChangeDescription = (description: string) => {
        game.description = description;
        forceUpdate();
    };

    return (
        <>
            <TextField
                label={t("Name")}
                variant="outlined"
                onChange={evt => onChangeName(evt.target.value)}
                value={game.name}
                sx={{ mb: 2 }}
            />
            <TextField
                multiline
                label={t("Description")}
                variant="outlined"
                onChange={evt => onChangeDescription(evt.target.value)}
                value={game.description}
                minRows={4}
            />
        </>
    );
}

export default Body;